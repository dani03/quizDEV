<?php

namespace App\Http\Controllers\Api\V1\Quiz;

use App\Http\Controllers\Controller;
use App\Http\Requests\QuizStoreRequest;
use App\Http\Resources\QuizResource;
use App\Http\Services\Quiz\QuizService;
use App\Models\Quiz;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function __construct(private QuizService $quizService) {

    }

    public function index() {
       // return $this->quizService->getQuizzes();
        return response()->json(['data' => QuizResource::collection($this->quizService->getQuizzes())]);

    }

    public function store(QuizStoreRequest $request) {

        //store the quiz
        return $this->quizService->createQuiz($request);
    }
}
