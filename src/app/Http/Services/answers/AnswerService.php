<?php

namespace App\Http\Services\answers;

use App\Http\Repositories\Answers\AnswerRepository;
use App\Models\Answer;
use App\Models\Question;

class AnswerService
{

    public function __construct(private AnswerRepository $answerRepository)
    {
    }


    //cette methode permet de créer des réponses liées à une question
    public function creatingAnswer(array $datas, Question $question) {
        foreach ($datas as $title => $value) {
            if(is_string($value)) {
                $value = ($value === "false" || $value === "null") ? false : true;
            }

            $data = ['title' => $title, 'correct_answer' => $value];
            if(! $this->answerRepository->create($data, $question)) {
                return false;
            }
        }
        return true;
    }
}
