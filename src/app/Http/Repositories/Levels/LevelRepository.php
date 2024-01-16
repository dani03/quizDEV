<?php

namespace App\Http\Repositories\Levels;

use App\Models\Level;

class LevelRepository
{
    public function create(string $name, int $point) {
        return Level::create([
            'name' => $name,
            'points' => $point
        ]);
    }
}
