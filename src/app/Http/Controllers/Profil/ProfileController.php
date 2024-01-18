<?php

namespace App\Http\Controllers\Profil;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfilUpdateRequest;
use App\Http\Resources\ProfilRessource;
use App\Http\Services\Profils\ProfilService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;

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
        $cacheKey = 'user:' . $user->id;
        $fromCache = false;
        # on met à jour
        $user->update($request->all());
        //on vérifie si une clé soit name, lastname, email à changer
        $valuesHasChanged = $user->wasChanged(['name', 'lastname', 'email']);
        if($valuesHasChanged) {
        $data = [
            "data" => $request->all(),
            "message" => "profil mis à jour",
        ];
        } else {
            $data = [
                "data" => $request->all(),
                "message" => "pas de changements effectués",
                ];
            // set temps d'expirations de 4 heures
            Cache::store('redis')->put($cacheKey, $data, now()->addHours(4));
            $fromCache = true ;
        }
        return response()->json([$cacheKey => $data, "from cache" => $fromCache], Response::HTTP_ACCEPTED);
    }
}
