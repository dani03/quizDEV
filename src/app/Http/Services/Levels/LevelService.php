<?php

namespace App\Http\Services\Levels;

use App\Http\Repositories\Levels\LevelRepository;

class LevelService
{
    public function __construct(private LevelRepository $levelRepository) {

    }

    public function creatingLevel(array $level) {
        $name = $level['name'];
        $points = $level['points'];
        return $this->levelRepository->create($name, $points);

    }

}
