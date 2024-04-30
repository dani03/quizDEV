<?php

namespace App\Http\Services\Profils;

use App\Http\Repositories\Users\UserRepository;
use App\Models\User;

class ProfilService
{
     public function __construct(private UserRepository $userRepository)
    {
    }

    public function getProfile(int $id) {
        return $this->userRepository->find($id);
    }

    public function deleteProfile() {

    }

    public function updateProfile(User $user , array $data): bool
    {
       return $this->userRepository->update($user, $data);
    }


}
