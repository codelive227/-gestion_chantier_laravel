<?php

namespace App\Http\Controllers;

use App\Models\Paiement;
use App\Models\Chantier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PaiementController extends Controller
{
    // Liste des paiements avec pagination et recherche
    public function index(Request $request)
    {
        $query = Paiement::with('chantier')->latest();

        if ($request->has('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('montant', 'like', '%' . $request->search . '%')
                  ->orWhere('mode_reglement', 'like', '%' . $request->search . '%');
            });
        }

        return response()->json([
            'success' => true,
            'data' => $query->paginate(10),
        ]);
    }

    // Récupérer la liste des chantiers pour les sélections
    public function chantiers()
    {
        return response()->json([
            'success' => true,
            'data' => Chantier::select('id', 'designation', 'etat', 'location')->get(),
        ]);
    }

    // Enregistrer un nouveau paiement
    public function store(Request $request)
{
    $validated = $request->validate([
        'chantier_id' => 'required|exists:chantiers,id',
        'mode_reglement' => 'required|string',
        'date_paiement' => 'required|date',
        'montant' => 'required|numeric',
    ]);

    $paiement = Paiement::create($validated);

    return response()->json([
        'message' => 'Paiement créé avec succès',
        'data' => $paiement,
    ], 201);
}


    // Afficher un paiement spécifique
    public function show($id)
    {
        $paiement = Paiement::with('chantier')->find($id);

        if (!$paiement) {
            return response()->json([
                'success' => false,
                'message' => 'Paiement non trouvé.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $paiement,
        ]);
    }

    // Modifier un paiement existant
   public function update(Request $request, $id)
{
    $request->validate([
        'montant' => 'required|numeric|min:0',
        'mode_reglement' => 'required|string',
        'chantier_id' => 'required|exists:chantiers,id',
        'date_paiement' => 'required|date',
    ]);

    $paiement = Paiement::findOrFail($id);
    $paiement->update($request->all());

    return response()->json(['success' => true, 'message' => 'Paiement mis à jour']);
}


    // Supprimer un paiement
    public function destroy($id)
    {
        $paiement = Paiement::find($id);

        if (!$paiement) {
            return response()->json([
                'success' => false,
                'message' => 'Paiement non trouvé.',
            ], 404);
        }

        $paiement->delete();

        return response()->json([
            'success' => true,
            'message' => 'Paiement supprimé avec succès.',
        ], 200);
    }
}
