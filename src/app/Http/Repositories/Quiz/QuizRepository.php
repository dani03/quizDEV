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

}
