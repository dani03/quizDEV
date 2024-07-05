<?php

namespace App\Http\Repositories\Quiz;

use App\Models\Quiz;
use Illuminate\Support\Facades\DB;

class QuizRepository
{

    public function create(array $data) {
        return Quiz::create([
            'title' => $data['title'],
            'level_id' => $data['level_id'],
            'user_id' => $data['user_id'],
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

    public function insertUserAnswer(array $data): bool
    {
        return DB::table('user_answers')->insert([
            'user_id' => auth()->user()->id,
            'quiz_id' => $data['quizId'],
            'question_id' => $data['questionIdUser'],
            'answer_id' => $data['answerIdUser'],
        ]);
    }

}
