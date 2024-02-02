<?php

namespace App\Http\Services\Profils;

use App\Http\Repositories\Users\UserRepository;

class ProfilService
{
     public function __construct(private UserRepository $userRepository)
    {
    }

    public function getProfile() {

    }


}
