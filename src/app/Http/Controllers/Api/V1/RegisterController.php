<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Services\Auth\RegisterService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class RegisterController extends Controller
{
    private RegisterService $registerService;
    public function __construct()
    {
        $this->registerService = new RegisterService();
    }


    public function __invoke(RegisterRequest $request)
    {
        $userCreate = $this->registerService->addUser($request);
        if (!$userCreate) {
            return Response()->json([
                'data' => [
                    'message' => 'impossible de créer l\'utilisateur un blème....'
                ]
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
        $device = substr($request->userAgent() ?? '', 0, 255);

        return Response()->json([
            'access_token' => $userCreate->createToken($device)->accessToken
        ], Response::HTTP_CREATED);
    }
}
