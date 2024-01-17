<?php

namespace App\Models;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Level extends Model
{
    use HasFactory, SoftDeletes, Sluggable;

    protected $fillable = ['name', 'points', 'slug'];

    // cette methode permet de générer un slug automatiquement
    public function sluggable(): array
    {

        return [
            'slug' => [
                'source' => 'name',
                'onUpdate' => true
            ]
        ];
    }

}
