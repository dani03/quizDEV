<?php

namespace App\Http\Repositories\Answers;

use App\Models\Answer;
use App\Models\Question;

class AnswerRepository
{
    public function create(array $data, Question $question) {
      return  Answer::create([
          'answer' => $data['title'],
          'correct_answer' => $data['correct_answer'],
          'question_id' => $question->id
      ]);
    }

}
