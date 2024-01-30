<?php

namespace App\Http\Controllers\Api\V1\Questions;

use App\Http\Controllers\Controller;
use App\Http\Repositories\Answers\AnswerRepository;
use App\Http\Requests\QuestionStoreRequest;
use App\Http\Resources\QuestionResource;
use App\Http\Services\answers\AnswerService;
use App\Http\Services\Questions\QuestionService;
use App\Models\Question;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class QuestionController extends Controller
{

    public function __construct(private QuestionService $questionService)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * @param QuestionStoreRequest $request
     * answers attends un tableau clés valeurs/json où la clé est la reponse et la valeur est boolean
     * pour savoir si c'est la reponse exacte ou pas
     *
     */

    public function store(QuestionStoreRequest $request)
    {
        //on vérifie si l'utilisateur à l'autorisation pour effectuer cette action
        if ($request->user()->cannot('create-question', Question::class)) {
            //abort(403, 'nope');
            return response()->json(['message' => 'vous n\'avez pas les droits requis pour effectuer cette action.'], Response::HTTP_FORBIDDEN);

        }
        $question = $this->questionService->creatingQuestion($request);
        if(!$question) {
           return response()->json(['message' => 'votre question n\'a pas pu être créer contacter l\'administrateur. '], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        //ajouter les réponses de la question qu'on vient de créer.
        $answers = $request->answers;
        $answerAdded = (new AnswerService((new AnswerRepository())))->creatingAnswer($answers, $question);
        return $answerAdded;
        if(!$answerAdded) {
            return response()->json(['message' => 'impossible d\'ajouter des réponses à ses questions '], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
       return response()->json(['message' => "questions et réponses ajoutés"], Response::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
