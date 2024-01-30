<?php

namespace App\Http\Resources;

use App\Http\Repositories\Users\UserRepository;
use App\Http\Services\Profils\ProfilService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class QuestionResource extends JsonResource
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
            'points' => $this->points,
            'level_id' => $this->level_id,
            'title' => $this->title,
            'domain_id' => $this->domain_id,
            'user' => ProfilRessource::make((new UserRepository())->find($this->user_id)),
            'created_at' =>  Carbon::make($this->created_at)->diffForHumans(),
            'updated_at' => Carbon::make($this->updated_at)->diffForHumans(),
        ];
    }
}
