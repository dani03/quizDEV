<?php

namespace App\Http\Controllers;

use App\Http\Requests\LoginRequest;
use App\Http\Services\Auth\LoginService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function __construct(private LoginService $loginService)
    {
    }

    function __invoke(LoginRequest $request)
    {
        $user = $this->loginService->getUser($request);
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['l\'email ou le mot de passe est incorrecte...']
            ]);
        }

        //si tout est bon
        $device = substr($request->userAgent() ?? '', 0, 30);
        $expireDate = $request->remenber ? null : now()->addMinutes(config('session.lifetime'));

        return Response()->json([
            "access_token" => $user->createToken($device)->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => $expireDate,

        ], Response::HTTP_CREATED);
    }
}
