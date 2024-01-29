<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Answer extends Model
{
    use HasFactory, Sluggable;

    protected $fillable = ['answer', 'slug', 'correct_answer', 'question_id', 'slug'];

    public function sluggable(): array
    {

        return [
            'slug' => [
                'source' => 'answer',
                'onUpdate' => true
            ]
        ];
    }

    public function question(): BelongsTo {
        return $this->BelongsTo(Question::class);
    }

}
