<?php

namespace App\Http\Controllers;

use App\Models\MatierePremiere;
use Illuminate\Http\Request;

class MatierePremiereController extends Controller
{
    public function index(Request $request)
    {
        $query = MatierePremiere::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('designation', 'like', "%$search%");
        }

        return $query->paginate($request->perPage ?? 10);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'designation' => 'required|string|max:255',
        ]);

        $matierePremiere = MatierePremiere::create($validated);

        return response()->json($matierePremiere, 201);
    }

    public function show($id)
{
    $matiere = MatierePremiere::find($id);

    if (!$matiere) {
        return response()->json(['message' => 'Matière première non trouvée'], 404);
    }

    return response()->json($matiere);
}


public function update(Request $request, $id)
{
    $matiere = MatierePremiere::find($id);

    if (!$matiere) {
        return response()->json(['message' => 'Matière première non trouvée'], 404);
    }

    $request->validate([
        'designation' => 'required|string|max:255',
    ]);

    $matiere->designation = $request->designation;
    $matiere->save();

    return response()->json(['message' => 'Matière première mise à jour avec succès']);
}


    public function destroy(MatierePremiere $matierePremiere)
    {
        $matierePremiere->delete();

        return response()->json(null, 204);
    }
}