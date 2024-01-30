<?php

namespace App\Http\Services\Questions;

use App\Http\Repositories\Questions\QuestionRepository;
use App\Http\Requests\QuestionStoreRequest;
use App\Models\Question;

class QuestionService
{
    public function __construct(private QuestionRepository $questionRepository)
    {
    }

    public function creatingQuestion(QuestionStoreRequest $request): Question|null {

        $data = [
          'title' => $request->title,
          'points' => $request->points ?? 1,
          'user_id' => auth()->user()->id,
          'domain_id' => $request->domain_id,
          'level_id' => $request->level_id,

        ];
       return $this->questionRepository->create($data);

    }
}
