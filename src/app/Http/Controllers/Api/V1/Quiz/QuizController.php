<?php

namespace App\Http\Controllers\Api\V1\Quiz;

use App\Http\Controllers\Controller;
use App\Http\Requests\QuizStoreRequest;
use App\Http\Resources\QuizResource;
use App\Http\Services\Quiz\QuizService;
use App\Models\Quiz;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class QuizController extends Controller
{
    public function __construct(private QuizService $quizService) {

    }


    /**
     * GET QUIZ
     * récupérations de tous les quiz
     * @return \Illuminate\Http\JsonResponse
     */
    public function index() {

        return response()->json(['data' => Cache::remember('quizzes', 60*60*24, function() {
           return  QuizResource::collection($this->quizService->getQuizzes());
        })], Response::HTTP_OK );

    }

    public function store(QuizStoreRequest $request) {

        //store the quiz
        return $this->quizService->createQuiz($request);
    }
}
