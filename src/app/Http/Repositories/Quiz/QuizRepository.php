<?php

namespace App\Http\Repositories\Quiz;

use App\Models\Quiz;

class QuizRepository
{

    public function create(array $data) {
        return Quiz::create([
            'title' => $data['title'],
            'level_id' => $data['level_id'],
        ]);
    }

    /**
     * récupérer tous les quiz avec ses questions
     */
    public function getQuizWithQuestions() {
        return Quiz::with('questions')->get();
    }

    public function getQuiz(int $quizId): null|Object  {
        return Quiz::with('questions')->where('id', $quizId)->first();
    }

}
