<?php

namespace App\Http\Resources;

use App\Http\Repositories\Levels\LevelRepository;
use App\Http\Services\Levels\LevelService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuizResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $uniqueParticipants = $this->participants->unique('id');
        $quiz = $this->resource['quiz'];

        $question = $this->resource['question'];
        $userAnswer = $question->answers->firstWhere('id', $this->resource['user_answer_id']);

        return [
            'id' => $quiz->id,
            'title' => $quiz->title,
            'slug' => $quiz->slug,
            'level_id' => $quiz->level_id,
            'level_name' => (new LevelService(new LevelRepository()))->getLevelName($quiz->level_id),
            'domaine_name' => (new LevelService(new LevelRepository()))->getLevelName($quiz->level_id),
            'created_at' => Carbon::make($quiz->created_at)->diffForHumans(),
            'updated_at' => Carbon::make($quiz->updated_at)->diffForHumans(),
            'question' => $question->title,
            'answers' => AnswerResource::collection($question->answers),
            'correct_answer' => $question->answers->firstWhere('correct_answer', true)->answer,
            'user_answer' => $userAnswer ? $userAnswer->answer : null,
        ];
    }
}
