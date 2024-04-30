<?php

namespace App\Http\Services\Quiz;

use App\Http\Repositories\Quiz\QuizRepository;
use App\Http\Requests\QuizStoreRequest;
use App\Http\Resources\AnswerResource;
use App\Http\Resources\QuestionResource;

class QuizService
{
    public function __construct(private QuizRepository $quizRepository)
    {
    }

    public function createQuiz(QuizStoreRequest $request) {
        $data = [
            'title' => $request->title,
            'level_id' => $request->level_id,
            'user_id' => auth()->user()->id

        ];
        return $this->quizRepository->create($data);

    }

    public function getQuizzes() {
      return $this->quizRepository->getQuizWithQuestions();
    }

    public function getQuiz(int $quizId) {
       return $this->quizRepository->getQuiz($quizId);
    }

    public function userAnswerToQuiz($userAnswers,  $questionsQuiz): array {
        $responseOfUser = [];
        $points = 0;
        foreach ($userAnswers as $questionIdUser => $answerIdUser) {
            foreach ($questionsQuiz as $question) {
                $findAnswer = false;
                $questionIdUser = (int) $questionIdUser;
                //on récupère les 2 questions égales
                if($questionIdUser === $question->id) {
                    $answers =  AnswerResource::collection($question->answers);
                    foreach ($answers as $answer) {
                        if($answer->id === (int) $answerIdUser) {
                            $findAnswer = true;
                            $points += $answer->correct_answer ? $question->points : 0;
                            $responseUser = [
                                'question' => $question->title,
                                'answers' => AnswerResource::collection($question->answers),
                                'correct_answer' => $question->answers->firstWhere('correct_answer', true)->answer,
                                'user_answer' => $answer->answer
                            ];

                            $responseOfUser[] = $responseUser;
                        }
                    }
                    // si aucune réponse n'a été trouvée c'est à dire si la réponse est fausse
                    if(!$findAnswer) {
                        //return $question->answers;
                        $responseUser = [
                            'question' => $question->title,
                            'answers' => AnswerResource::collection($question->answers),
                            'correct_answer' => $question->answers->firstWhere('correct_answer', true)->answer,
                            'user_answer' => $question->answers->firstWhere('id', $answerIdUser)->answer
                        ];
                        $responseOfUser[] = $responseUser;
                    }

                }
            }

        }


        return ["results" => $responseOfUser, 'points' => $points];
    }

}
