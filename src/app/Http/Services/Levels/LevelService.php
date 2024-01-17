<?php

namespace App\Http\Services\Levels;

use App\Http\Repositories\Levels\LevelRepository;
use Illuminate\Database\Eloquent\Collection;

class LevelService
{
    public function __construct(private LevelRepository $levelRepository) {

    }

    public function creatingLevel(array $level) {
        $name = $level['name'];
        $points = $level['points'];
        return $this->levelRepository->create($name, $points);

    }

    public function getLevel(string $levelSlug) {
       return  $this->levelRepository->find($levelSlug);
    }

    /**
     * suppréssion d'un niveau (level)
     */

    public function deleteLevel(string $levelSlug):bool {
       $level = $this->getLevel($levelSlug);
       if(!$level) {
           return false;
       }
      return $this->levelRepository->delete($level);
    }

    public function getAllLevels(): Collection | null {
        return $this->levelRepository->findAll();
    }
}
