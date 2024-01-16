<?php

namespace App\Http\Controllers\Levels;

use App\Http\Controllers\Controller;
use App\Http\Requests\LevelRequest;
use App\Http\Resources\LevelResource;
use App\Http\Services\Levels\LevelService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Http;

class LevelController extends Controller
{

    public function __construct(private LevelService $levelService)
    {
    }


    /**
     * Store the newly created resource in storage.
     */
    public function store(LevelRequest $request)
    {
        //on vérifie que l'utilisateur qui effectue la request est un admin
        Gate::authorize('create-level');

       $storeLevel = $this->levelService->creatingLevel($request->all());
       if(!$storeLevel) {
           return response()->json(['message' => 'Failed to create level'], Response::HTTP_INTERNAL_SERVER_ERROR);
       }
        return response()->json(['message' => 'le niveau à bien été crée',
            'level' => LevelResource::make($storeLevel)], Response::HTTP_CREATED);
    }

    /**
     * Display the resource.
     */
    public function show()
    {
        //
    }

    /**
     * Show the form for editing the resource.
     */
    public function edit()
    {
        //
    }

    /**
     * Update the resource in storage.
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the resource from storage.
     */
    public function destroy(): never
    {
        abort(404);
    }
}
