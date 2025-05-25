<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Client;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    
    public function run(): void
    {
        // Désactivez les événements modèle si nécessaire
        // User::withoutEvents(function () {
            \App\Models\Client::factory(10)->create();
            \App\Models\Chantier::factory(10)->create();
            \App\Models\Paiement::factory(10)->create();
            \App\Models\Fournisseur::factory(10)->create();
            \App\Models\Bon::factory(10)->create();
            \App\Models\MatierePremiere::factory(10)->create();
            \App\Models\Article::factory(10)->create();
            \App\Models\Ouvrier::factory(10)->create();
            \App\Models\ArticleChantier::factory(10)->create();
            \App\Models\ArticleChantierOuvrier::factory(10)->create();
        // });
    }
}
