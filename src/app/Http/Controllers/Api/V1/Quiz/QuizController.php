<?php

namespace App\Http\Controllers\Api\V1\Quiz;

use App\Http\Controllers\Controller;
use App\Http\Repositories\Questions\QuestionRepository;
use App\Http\Repositories\Users\UserRepository;
use App\Http\Requests\OpenAiRequest;
use App\Http\Requests\QuizReponseRequest;
use App\Http\Requests\QuizStoreRequest;
use App\Http\Resources\QuizResource;
use App\Http\Services\Profils\ProfilService;
use App\Http\Services\Questions\QuestionService;
use App\Http\Services\Quiz\QuizService;
use App\Http\Resources\QuestionResource;
use App\Http\Resources\AnswerResource;
use App\Models\Question;
use App\Models\Quiz;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Http;
use Symfony\Component\HttpFoundation\Response;

class QuizController extends Controller
{
    public function __construct(private QuizService $quizService)
    {
    }


    /**
     * GET QUIZ
     * récupérations de tous les quiz
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {

        return response()->json(['data' => Cache::remember('quizzes', 60 * 60 * 24, function () {
            return QuizResource::collection($this->quizService->getQuizzes());
        })], Response::HTTP_OK);
    }

    /**
     * Pour créer un quiz
     *
     * Utiliser les paramètres ci-dessous.
     * Vous pouvez ajouter à la création d'un quiz l'ajout ou des questions à ce quiz ou
     * la création des questions
     *
     * le paramètre questions attend une liste (tableau / objet) de question comme défini dans l'onglet de création d'une
     * question
     *
     * Le paramètre questions_ids attend un tableau d'ids de question existante.
     * @param QuizStoreRequest $request
     * @return JsonResponse
     *
     *
     */
    public function store(QuizStoreRequest $request): JsonResponse
    {
        if ($request->user()->cannot('create-quiz', Quiz::class)) {
            return response()->json(['message' => 'vous n\'avez pas les droits requis pour effectuer cette action.'], Response::HTTP_FORBIDDEN);
        }
        $quiz = $this->quizService->createQuiz($request);
        if ($request->has('questions')) {
            //on vérifie si l'utilisateur à l'autorisation pour effectuer cette action
            (new QuestionService(new QuestionRepository()))->createQuestions($request->questions, $quiz->id);
        }
        if ($request->has('questions_ids')) {
            $quiz->questions()->attach($request->questions_ids);
        }

        return response()->json(['message' => "quiz crée avec succès"], Response::HTTP_CREATED);
    }


    /**
     * Permet de répondre à un quiz
     *
     */
    public function answerQuiz(QuizReponseRequest $request, int $quizId)
    {
        //vérification si le quiz est bien present en BDD
        $userAnswers = $request->questions_answer;
        $quiz = $this->quizService->getQuiz($quizId);
        if (!$quiz) {
            return response()->json(['message' => "Impossible de trouver le quiz."], Response::HTTP_NOT_FOUND);
        }
        $quizzes = QuizResource::make($quiz);
        // recupération des questions et réponses
        $questionsOfQuiz = QuestionResource::collection($quizzes->questions);
        //récupération de l'utilisateur connecté
        $user = (new ProfilService(new UserRepository()))->getProfile(auth()->user()->id);
        if (!$user) {
            return response()->json(['message' => "utilisateur non trouvé."], Response::HTTP_NOT_FOUND);
        }
        $responseOfUser = $this->quizService->userAnswerToQuiz($userAnswers, $questionsOfQuiz);
        //on associe le user au quiz afin de le comptabiliser comme quiz effectué par l'utilisateur
        if (!$quiz->users()->where('user_id', $user->id)->where('quiz_id', $quiz->id)->exists()) {
            $user->quizzes()->attach($quizId);
        }
        //updated points user
        $data = ['points' => $user->points + $responseOfUser['points']];
        (new ProfilService(new UserRepository()))->updateProfile($user, $data);
        return response()->json([
            'message' => "Vous avez obtenu {$responseOfUser["points"]} point.s sur ce quiz. total de points: {$user->points}",
            'results' => $responseOfUser['results'],
        ], Response::HTTP_OK);
    }

    public function show(Request $request, int $quizId)
    {

        $quiz = $this->quizService->getQuiz($quizId);
        if (!$quiz) {
            return response()->json(['message' => "le quiz n'a pas été trouvé."], Response::HTTP_NOT_FOUND);
        }
        return response()->json(QuizResource::make($quiz), Response::HTTP_NOT_FOUND);
    }


    public function destroy(int $quizId)
    {
        $quiz = $this->quizService->getQuiz($quizId);
        if (!$quiz) {
            return response()->json(['message' => "le quiz n'existe pas."], Response::HTTP_NOT_FOUND);
        }
        $this->authorize('delete-quiz', $quiz);
        $quiz->delete();
        return response()->json(['message' => "le quiz a été supprimé."], Response::HTTP_OK);
    }

    /**
     * générer un quiz à l'aide d'open ai
     *
     * Si vous avez des questions ou souhaitez créer un quiz, n'hésitez pas à les poser ici ! Des questions et réponses seront générées, et vous pourrez les intégrer.
     * @param OpenAiRequest $request
     * @return array|mixed
     *
     */
    public function generateQuizByOpenAi(OpenAiRequest $request)
    {
        // on fait appel à la clé de notre compte openai
        $responseAi = Http::withToken(config('services.openai.secret'))->post("https://api.openai.com/v1/chat/completions",
            [
                "model" => "gpt-3.5-turbo",
                "messages" => [
                    [
                        "role" => "system",
                        "content" => "You are an artificial intelligence that generates multiple-choice questions in the field of computer science."
                    ],
                    [
                        "role" => "user",
                        "content" => $request->get('text') ?? "Bonjour peux tu me donner une question a choix multiple sur le domaine de l'informatique ? (met une étoile sur la bonne réponse)"
                    ]
                ]
            ])->json();

        return $responseAi;
    }
}
