<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;

class Quiz extends Model
{
    use HasFactory, SoftDeletes, Sluggable;

    protected $fillable = ['title', 'level_id', 'slug'];

    public function sluggable(): array
    {

        return [
            'slug' => [
                'source' => 'title',
                'onUpdate' => true
            ]
        ];
    }


    public function questions(): BelongsToMany {
        return $this->belongsToMany(Question::class);
    }

    public function level(): HasOne {
        return $this->hasOne(Level::class);
    }


}
