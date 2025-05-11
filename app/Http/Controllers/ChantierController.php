<?php

namespace App\Http\Controllers;

use App\Models\Chantier;
use App\Models\Client;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ChantierController extends Controller
{
    // Get all chantiers with pagination and search
 // app/Http/Controllers/ChantierController.php

public function index(Request $request)
{
    $query = Chantier::with('client')->latest();
    
    if ($request->has('search')) {
        $query->where('designation', 'like', '%'.$request->search.'%');
    }

    return response()->json($query->paginate(10));
}

public function clients()
{
    return response()->json([
        'data' => Client::select('id', 'nom', 'prenom', 'entreprise')->get()
    ]);
}

    // Store new chantier
    public function store(Request $request)
    {
        $validated = $request->validate([
            'designation' => 'required|string|max:255',
            'type_chantier' => 'required|string|max:255',
            'etat' => 'required|in:En attente,En cours,Terminé',
            'client_id' => 'required|exists:clients,id',
            'localisation' => 'required|string',
            'date_debut' => 'required|date',
            'date_estime' => 'required|date|after_or_equal:date_debut',
        ]);

        $chantier = Chantier::create($validated);
        return response()->json($chantier, 201);
    }
    // Get single chantier
   // ChantierController.php
public function show($id)
{
    $chantier = Chantier::with('client')->find($id);
    
    if (!$chantier) {
        return response()->json([
            'success' => false,
            'message' => 'Chantier non trouvé'
        ], 404);
    }

    return response()->json([
        'success' => true,
        'data' => $chantier
    ]);
}

    // Update chantier
    public function update(Request $request, $id)
    {
        $chantier = Chantier::findOrFail($id);
        
        $validator = Validator::make($request->all(), [
            'designation' => 'sometimes|required|string|max:255',
            'type_chantier' => 'sometimes|required|string|max:255',
            'etat' => 'sometimes|required|in:En attente,En cours,Terminé',
            'client_id' => 'sometimes|required|exists:clients,id',
            'localisation' => 'sometimes|required|string',
            'date_debut' => 'sometimes|required|date',
            'date_estime' => 'sometimes|required|date|after_or_equal:date_debut',
        ]);
        
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }
        
        $chantier->update($request->all());
        
        return response()->json($chantier);
    }

    // Delete chantier
    public function destroy($id)
    {
        $chantier = Chantier::findOrFail($id);
        $chantier->delete();
        
        return response()->json(null, 204);
    }
}