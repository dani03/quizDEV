<?php

namespace App\Http\Services\Quiz;

use App\Http\Repositories\Quiz\QuizRepository;
use App\Http\Requests\QuizStoreRequest;

class QuizService
{
    public function __construct(private QuizRepository $quizRepository)
    {
    }

    public function createQuiz(QuizStoreRequest $request) {
        $data = [
            'title' => $request->title,
            'level_id' => $request->level_id
        ];
        return $this->quizRepository->create($data);

    }

    public function getQuizzes() {
      return $this->quizRepository->getQuizWithQuestions();
    }

}
