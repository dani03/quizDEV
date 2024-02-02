<?php

use App\Http\Controllers\Api\V1\RegisterController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\Profil\ProfileController;
use App\Http\Controllers\TestConnexionController;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Request;
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

// les routes ci dessous on besoin d'être authentifier avant d'être atteinte
Route::middleware(['auth:api'])->group(function () {
    Route::get('profil', [ProfileController::class, 'show'])->name('profil.show');
    Route::put('update/profil', [ProfileController::class, 'update'])->name('profil.update');
});
