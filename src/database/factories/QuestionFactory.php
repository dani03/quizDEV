<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Question>
 */
class QuestionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::factory()->create();
        return  [
            'title' => fake()->title,
            'slug' => fake()->unique()->slug,
            'domain_id' => fake()->numberBetween(1, 3),
            'user_id' => $user->id,
            'points' => fake()->numberBetween(1, 10),
            'level_id' => random_int(1, 4)
        ];

    }
}
