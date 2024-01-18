<?php

use App\Http\Controllers\Api\V1\Domain\DomainController;
use App\Http\Controllers\Api\V1\PasswordUpdateController;
use App\Http\Controllers\Api\V1\RegisterController;
use App\Http\Controllers\Api\V1\Users\EntrepriseController;
use App\Http\Controllers\Api\V1\Users\UserController;
use App\Http\Controllers\Levels\LevelController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Profil\ProfileController;
use App\Http\Controllers\TestConnexionController;

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\V1\LogoutController;

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

// les routes ci-dessous ont besoin d'être authentifié avant d'être atteinte
Route::middleware(['auth:api'])->group(function () {
    Route::get('profil', [ProfileController::class, 'show'])->name('profil.show');
    Route::put('update/profil', [ProfileController::class, 'update'])->name('profil.update');
    Route::put('update/password', PasswordUpdateController::class);
    Route::post('logout', LogoutController::class);

    Route::get('user/quiz', [UserController::class, 'index']);
    Route::get('entreprise/quiz', [EntrepriseController::class, 'index']);

    //level les nivaux
    Route::post('level/store', [LevelController::class, 'store']);
    Route::get('levels', [LevelController::class, 'index']);
    Route::delete('level/destroy', [LevelController::class, 'destroy']);

    // domain
    Route::post('domain/create', [DomainController::class, 'store'])->middleware('is.admin');
});
