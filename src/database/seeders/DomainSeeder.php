<?php

namespace Database\Seeders;

use App\Models\Domain;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DomainSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         Domain::create(['name' => 'développement(test)']);
         Domain::create(['name' => 'réseaux(test)']);
         Domain::create(['name' => 'IOT(test)']);
    }
}
