<?php

namespace App\Http\Controllers\Api\V1\Domain;

use App\Http\Controllers\Controller;
use App\Http\Requests\DomainStoreRequest;
use App\Http\Resources\DomainResource;
use App\Models\Domain;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class DomainController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return DomainResource::collection(Domain::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DomainStoreRequest $request)
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
    public function destroy(int $id)
    {

        if(Domain::destroy($id)) {
             return \response()->json(['message' => 'domain supprimé.'], Response::HTTP_NO_CONTENT);
        }
             return \response()->json(['message' => 'une erreur est survenue impossible de supprimer'],
                 Response::HTTP_BAD_REQUEST);

    }
}
