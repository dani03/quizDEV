<?php

use App\Http\Controllers\Api\V1\Domain\DomainController;
use App\Http\Controllers\Api\V1\Levels\LevelController;
use App\Http\Controllers\Api\V1\LoginController;
use App\Http\Controllers\Api\V1\LogoutController;
use App\Http\Controllers\Api\V1\PasswordUpdateController;
use App\Http\Controllers\Api\V1\Profil\ProfileController;
use App\Http\Controllers\Api\V1\Questions\QuestionController;
use App\Http\Controllers\Api\V1\Quiz\QuizController;
use App\Http\Controllers\Api\V1\RegisterController;
use App\Http\Controllers\Api\V1\Users\EntrepriseController;
use App\Http\Controllers\Api\V1\Users\UserController;
use App\Http\Controllers\TestConnexionController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
Route::get('test', TestConnexionController::class);
Route::post('auth/register', RegisterController::class)->name('register');
Route::post('auth/login', LoginController::class)->name('login');

//levels
Route::get('levels', [LevelController::class, 'index']);

//domains
Route::get('domains', [DomainController::class, 'index']);

//questions
Route::get('questions', [QuestionController::class, 'index']);

//quiz
Route::get('quizzes', [QuizController::class, 'index']);

// les routes ci-dessous ont besoin d'être authentifié avant d'être atteinte
Route::middleware(['auth:api'])->group(function () {
    Route::get('profil', [ProfileController::class, 'show'])->name('profil.show');
    Route::put('update/profil', [ProfileController::class, 'update'])->name('profil.update');
    Route::put('update/password', PasswordUpdateController::class);
    Route::post('logout', LogoutController::class);
    Route::delete('delete/profil', [ProfileController::class, 'destroy']);

    Route::get('user/quiz', [UserController::class, 'index']);
    Route::get('entreprise/quiz', [EntrepriseController::class, 'index']);

    //level les nivaux
    Route::post('level/store', [LevelController::class, 'store']);

    Route::delete('level/destroy', [LevelController::class, 'destroy']);

    // domain

    Route::post('domain/store', [DomainController::class, 'store'])->middleware('is.admin');
    Route::delete('domain/delete/{id}', [DomainController::class, 'destroy'])->middleware('is.admin');

    // questions

    Route::post('question/store', [QuestionController::class, 'store']);
    Route::get('question/show/{id}', [QuestionController::class, 'show']);
    Route::put('question/update/{id}', [QuestionController::class, 'update']);
    Route::put('question/delete/{id}', [QuestionController::class, 'destroy']);

    // quiz

    Route::post('quiz/store', [QuizController::class, 'store']);
});
