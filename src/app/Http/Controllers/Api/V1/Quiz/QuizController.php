<?php

namespace App\Http\Controllers\Api\V1\Quiz;

use App\Http\Controllers\Controller;
use App\Http\Repositories\Questions\QuestionRepository;
use App\Http\Requests\QuizStoreRequest;
use App\Http\Resources\QuizResource;
use App\Http\Services\Questions\QuestionService;
use App\Http\Services\Quiz\QuizService;
use App\Models\Question;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class QuizController extends Controller
{
    public function __construct(private QuizService $quizService) {

    }


    /**
     * GET QUIZ
     * récupérations de tous les quiz
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {

        return response()->json(['data' => Cache::remember('quizzes', 60*60*24, function() {
           return  QuizResource::collection($this->quizService->getQuizzes());
        })], Response::HTTP_OK );

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
        if ($request->user()->cannot('create-question', Question::class)) {
            return response()->json(['message' => 'vous n\'avez pas les droits requis pour effectuer cette action.'], Response::HTTP_FORBIDDEN);
        }
        $quiz = $this->quizService->createQuiz($request);
        if($request->has('questions')){
            //on vérifie si l'utilisateur à l'autorisation pour effectuer cette action
            (new QuestionService(new QuestionRepository()))->createQuestions($request->questions, $quiz->id);
        }
        if($request->has('questions_ids')) {
            $quiz->questions()->attach($request->questions_ids);
        }

        return response()->json(['message' => "quiz crée avec succès"], Response::HTTP_CREATED);
    }
}
