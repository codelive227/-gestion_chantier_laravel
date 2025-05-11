<?php

namespace App\Http\Controllers;

use App\Models\Ouvrier;
use Illuminate\Http\Request;

class OuvrierController extends Controller
{
    // Liste des ouvriers avec recherche et pagination
    public function index(Request $request)
    {
        $query = Ouvrier::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nom', 'like', "%$search%")
                  ->orWhere('prenom', 'like', "%$search%");
            });
        }

        return response()->json(
            $query->paginate($request->perPage ?? 10)
        );
    }

    // Enregistrement d’un nouvel ouvrier
    public function store(Request $request)
    {
        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'statut' => 'required|string|max:255',
            'salaire_journalier' => 'required|numeric',
        ]);

        $ouvrier = Ouvrier::create($validated);

        return response()->json([
            'message' => 'Ouvrier créé avec succès',
            'data' => $ouvrier
        ], 201);
    }

    // Affichage des détails d’un ouvrier
    public function show($id)
    {
        $ouvrier = Ouvrier::find($id);

        if (!$ouvrier) {
            return response()->json(['message' => 'Ouvrier non trouvé'], 404);
        }

        return response()->json($ouvrier);
    }

    // Mise à jour d’un ouvrier
    public function update(Request $request, $id)
    {
        $ouvrier = Ouvrier::find($id);

        if (!$ouvrier) {
            return response()->json(['message' => 'Ouvrier non trouvé'], 404);
        }

        $validated = $request->validate([
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'statut' => 'required|string|max:255',
            'salaire_journalier' => 'required|numeric',
        ]);

        $ouvrier->update($validated);

        return response()->json(['message' => 'Ouvrier mis à jour avec succès']);
    }

    // Suppression d’un ouvrier
    public function destroy(Ouvrier $ouvrier)
    {
        $ouvrier->delete();

        return response()->json(['message' => 'Ouvrier supprimé avec succès'], 204);
    }
}
