<?php

namespace App\Http\Services\Profils;

use App\Http\Repositories\Users\UserRepository;
use App\Models\User;
use Illuminate\Http\File;

class ProfilService
{
    public function __construct(private UserRepository $userRepository)
    {
    }

    public function getProfile(int $id)
    {
        return $this->userRepository->find($id);
    }

    public function updateProfile(User $user, array $data): bool
    {
        return $this->userRepository->update($user, $data);
    }

    public function createImage($request):bool
    {
        $file = $request->file('image');
        $file_path = $this->saveImageProfil($file);
        $data = [
            'profil_picture' => $file_path,
        ];
        $user = $this->getProfile(auth()->user()->id);
        if($user) {
            return $this->userRepository->addProfilePicture($user, $data);
        }
        return false;
    }


    public function saveImageProfil(object $file)
    {
        $nameFile = $file->getClientOriginalName();
        $randomName = $file->hashName();
        $random = explode(".", $randomName);
        $finalFileName = $random[0] . "-" . $nameFile;
        return $file->storeAs('images_' . auth()->user()->id, $finalFileName);
    }


}
