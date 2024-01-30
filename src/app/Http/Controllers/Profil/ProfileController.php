<?php

namespace App\Http\Controllers\Profil;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfilUpdateRequest;
use App\Http\Resources\ProfilRessource;
use App\Http\Services\Cache\RedisCacheService;
use App\Http\Services\Profils\ProfilService;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ProfileController extends Controller
{

    public function __construct(private ProfilService $profilService)
    {
       // $this->profilService->getProfile(auth()->user()->id);
    }

    public function show(Request $request): JsonResponse
    {
        return Response()->json(['data' => new ProfilRessource($request->user())], Response::HTTP_OK);
    }

    public function update(ProfilUpdateRequest $request): JsonResponse
    {
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
            $fromCache = (new RedisCacheService())->updateCache($cacheKey, $data);
        }
        return response()->json([$cacheKey => $data, "from cache" => $fromCache], ResponseAlias::HTTP_ACCEPTED);
    }

    public function destroy() {
        $id = auth()->user()->id;
        $userToDelete = $this->profilService->getProfile($id);
        if(!$userToDelete) {
            return response()->json('cet utilisateur n\'existe pas.. ', ResponseAlias::HTTP_NOT_FOUND);
        }
       if (User::destroy($userToDelete->id)) {
           return response()->json('compte supprimé avec succès', ResponseAlias::HTTP_NO_CONTENT);
       }

        return response()->json('Une erreur est survenue impossible de supprimer le compte', ResponseAlias::HTTP_BAD_REQUEST);
    }
}
