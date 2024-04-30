<?php

namespace App\Http\Controllers\Api\V1\Links;

use App\Http\Controllers\Controller;
use App\Http\Repositories\Quiz\QuizRepository;
use App\Http\Requests\LinkRequest;
use App\Http\Services\Quiz\QuizService;
use App\Models\Link;
use Carbon\Carbon;
use http\Env\Response;
use Illuminate\Support\Facades\App;
use \Symfony\Component\HttpFoundation\Response as ResponseSm;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class LinkController extends Controller
{


    /**
     * créer un nouveau lien pour un quiz.
     */
    public function store(LinkRequest $request, $slug)
    {
        $this->authorize('create-quiz');
        //recupération du quiz
        $quiz_id = $request->quiz_id;
        $quiz = (new QuizService(new QuizRepository()))->getQuiz($quiz_id);
        if(!$quiz) {
            return response()->json(['message' => "ce quiz n'existe pas ou a été supprimé?"],ResponseSm::HTTP_NOT_FOUND);
        }

       $link = Link::create([
            "hash_token" => Hash('sha256', Str::random(32)) . "-" . urlencode($quiz->slug),
            "expires_at" => Carbon::now()->hour(2),
           'quiz_id' => $quiz->id
        ]);
        $appURL = env('APP_URL');
        $customLink = "{$appURL}/invitation-link?token={$link->hash_token}";
        return response()->json([
            'data' => "votre lien a été crée.",
            'link' => $customLink,

        ],ResponseSm::HTTP_OK);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
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
     */
    public function destroy(string $id)
    {
        //
    }
}
