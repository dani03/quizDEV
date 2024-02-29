<?php

namespace App\Http\Controllers\Api\V1\Quiz;

use App\Http\Controllers\Controller;
use App\Http\Requests\QuizStoreRequest;
use App\Http\Services\Quiz\QuizService;
use Illuminate\Http\Request;

class QuizController extends Controller
{
    public function __construct(private QuizService $quizService) {

    }

    public function index() {
        return "hello";
    }

    public function store(QuizStoreRequest $request) {
        return $request->all();
    }
}
