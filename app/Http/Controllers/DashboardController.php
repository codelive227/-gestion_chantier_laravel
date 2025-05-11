<?php

use App\Models\Fournisseur;
use App\Models\MatierePremiere;
use App\Models\Article;
use App\Models\Ouvrier;
use App\Models\Chantier;
use App\Models\Client;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function getStatistics()
    {
        $statistics = [
            'fournisseurs' => Fournisseur::count(),
            'matieresPremieres' => MatierePremiere::count(),
            'articles' => Article::count(),
            'ouvriers' => Ouvrier::count(),
            'chantiers' => Chantier::count(),
            'clients' => Client::count(),
        ];

        return response()->json($statistics);
    }
}
