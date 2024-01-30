<?php

namespace App\Http\Repositories\Questions;

use App\Models\Question;

class QuestionRepository
{
    public function create(array $data): Question|null {
       return Question::create($data);
    }
}
