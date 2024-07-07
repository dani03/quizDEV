<?php

namespace App\Http\Resources;

use App\Http\Repositories\Levels\LevelRepository;
use App\Http\Services\Levels\LevelService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuizResultResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $question = $this->resource['question'];
        $userAnswerId = $this->resource['user_answer_id'];
        $userAnswer = $question->answers->firstWhere('id', $userAnswerId);
        $correctAnswer = $question->answers->firstWhere('correct_answer', true);


        return [
            'id' => $this->resource['quiz']->id,
            'title' => $this->resource['quiz']->title,
            'level_id' => $this->resource['quiz']->level_id,
            'level_name' => (new LevelService(new LevelRepository()))->getLevelName($this->resource['quiz']->level_id),
            'created_at' => Carbon::make($this->resource['quiz']->created_at)->diffForHumans(),
            'updated_at' => Carbon::make($this->resource['quiz']->updated_at)->diffForHumans(),
            'question' => $question->title,
            'answers' => AnswerResource::collection($question->answers),
            'correct_answer' => $correctAnswer ? $correctAnswer->answer : null,
            'user_answer' => $userAnswer ? $userAnswer->answer : "aucune réponse",
        ];
    }
}
