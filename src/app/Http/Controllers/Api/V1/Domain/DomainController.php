<?php

namespace App\Http\Controllers\Api\V1\Domain;

use App\Http\Controllers\Controller;
use App\Http\Requests\DomainStoreRequest;
use App\Http\Resources\DomainResource;
use App\Models\Domain;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Support\Facades\Cache;
use Symfony\Component\HttpFoundation\Response;

class DomainController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        //ont stockent dans le cache une cle domains
        return DomainResource::collection(Cache::remember('domains', 60*60*24, static function () {
           return Domain::all();
        }));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DomainStoreRequest $request): JsonResponse
    {
        //creation du domain je ne passe par un service ici car c'est relativement court
       $createDomain = Domain::create(['name' => $request->input('name')]);
        return response()->json(['data' => new DomainResource($createDomain) ], Response::HTTP_CREATED);

    }


    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @id id of a specific domain to delete
     */
    public function destroy(int $id): JsonResponse
    {

        if(Domain::destroy($id)) {
             return \response()->json(['message' => 'domain supprimé.'], Response::HTTP_NO_CONTENT);
        }
             return \response()->json(['message' => 'une erreur est survenue impossible de supprimer'],
                 Response::HTTP_BAD_REQUEST);

    }
}
