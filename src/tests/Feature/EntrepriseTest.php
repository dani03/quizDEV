<?php

namespace Tests\Feature;

use App\Models\Role;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Faker\Factory as Faker;

class EntrepriseTest extends TestCase
{
    use RefreshDatabase;

    public function test_entreprise_has_access_to_his_fonctionnalities()
    {
        $faker = Faker::create();
        $entreprise = User::factory()->create([
            'role_id' => Role::ROLE_ENTREPRISE,
            'lastname' => $faker->firstName,
            'name' => $faker->lastName,
            'email' => $faker->email,
            'password' => 'password',


        ]);
        $response = $this->actingAs($entreprise)->getJson('/api/v1/entreprise/quiz');

        $response->assertStatus(200);
    }
}
