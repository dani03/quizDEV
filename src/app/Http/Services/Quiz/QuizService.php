<?php

namespace App\Http\Services\Quiz;

use App\Http\Repositories\Quiz\QuizRepository;

class QuizService
{
    public function __construct(private QuizRepository $quizRepository)
    {
    }

    public function createQuiz() {

    }

    public function getQuizzes() {
      return $this->quizRepository->getQuizWithQuestions();
    }

}
