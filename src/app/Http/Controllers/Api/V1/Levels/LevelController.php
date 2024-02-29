<?php

namespace App\Http\Controllers\Api\V1\Levels;

use App\Http\Controllers\Controller;
use App\Http\Requests\LevelDestroyRequest;
use App\Http\Requests\LevelRequest;
use App\Http\Resources\LevelResource;
use App\Http\Resources\LevelsResource;
use App\Http\Services\Levels\LevelService;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Gate;

class LevelController extends Controller
{

    public function __construct(private LevelService $levelService)
    {
    }

    /**
     * @return \Illuminate\Http\JsonResponse
     *

     */
    /**
     *  récupération de tous les levels(niveaux) récupére une collection de données et pas une seule donnée
     */
    public function index() {
        // $levels =$this->levelService->getAllLevels();
        return response()->json(['data' => Cache::remember('levels',60*60*24, function() {
            return LevelResource::collection($this->levelService->getAllLevels());
        })  ], Response::HTTP_OK);

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
    public function destroy(LevelDestroyRequest $request)
    {
        Gate::authorize('create-level');
        $slug = $request->slug;
        $level = $this->levelService->deleteLevel($slug);

       if(!$level) {
           return response()->json(['message' => ' ce niveau n\'existe pas '], Response::HTTP_NOT_FOUND);
       }
        return  response()->json(['message' => ' niveau supprimé '], Response::HTTP_OK);

    }
}
