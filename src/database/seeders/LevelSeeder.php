<?php

namespace Database\Seeders;

use App\Models\Level;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LevelSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $levels = ['débutant', 'intermédiaire', 'avancé', 'expert', 'consultant'];
        foreach ($levels as $level_name) {
            Level::create([
                'name' => $level_name,
                'points' => random_int(10,100),
                'slug' => fake()->unique()->slug
            ]);

        }

    }
}
