<?php

namespace App\Http\Repositories\Users;

use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserRepository
{



  public function createUser(RegisterRequest $request)
  {
    return User::create(
      [
        'name' => $request->name,
        'lastname' => $request->lastname,
        'email' => $request->email,
        'password' => Hash::make($request->password),
        'role_id' => $request->role_id,
      ]
    );
  }

  public function findUserByEmail(String $email): User | null
  {
    return User::where('email', $email)->first();
  }

  public function find(int $id): User|null {
      return User::find($id);
  }

  public function delete( User $user): bool|null {
      return $user->delete();
  }
}
