<?php

namespace App\Http\Resources;

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
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'level_id' => $this->level_id,
            'created_at' =>  Carbon::make($this->created_at)->diffForHumans(),
            'updated_at' => Carbon::make($this->updated_at)->diffForHumans(),
            'questions' => QuestionResource::collection($this->questions),
        ];
    }
}
