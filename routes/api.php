<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\FournisseurController;
use App\Http\Controllers\MatierePremiereController;
use App\Http\Controllers\OuvrierController;
use App\Http\Controllers\ChantierController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\PaiementController;

// Route pour récupérer l'utilisateur authentifié
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// Authentification
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

// API Resources
Route::apiResource('clients', ClientController::class);
Route::apiResource('fournisseurs', FournisseurController::class);
Route::apiResource('matiere-premieres', MatierePremiereController::class);
Route::apiResource('ouvriers', OuvrierController::class);
Route::apiResource('chantiers', ChantierController::class);
Route::apiResource('articles', ArticleController::class);
Route::apiResource('paiements', PaiementController::class);