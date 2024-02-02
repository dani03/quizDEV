<?php

namespace App\Http\Controllers\Profil;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfilUpdateRequest;
use App\Http\Resources\ProfilRessource;
use App\Http\Services\Profils\ProfilService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class ProfileController extends Controller
{

    public function __construct(private ProfilService $profilService)
    {
        $this->profilService->getProfile();
    }

    public function show(Request $request) {
        return Response()->json(['data' => new ProfilRessource($request->user())], Response::HTTP_OK);
    }

    public function update(ProfilUpdateRequest $request) {
        $user = auth()->user();
        # on met à jour
        $user->update($request->all());

        //on vérifie juste si les données de l'utilisateur ont changé
        $valuesHasChanged = $user->wasChanged(['name', 'lastname', 'email']);

        if($valuesHasChanged) {
        $data = [
            "message" => "profil mis à jour",
            "data" => $request->all()];

        } else {
            $data = [
                "message" => "pas de changements effectués",
                "data" => $request->all()
                ];
        }

        return response()->json($data, Response::HTTP_ACCEPTED);
    }
}
