<?php

// app/Http/Controllers/Api/FournisseurController.php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Fournisseur;
use Illuminate\Http\Request;

class FournisseurController extends Controller
{
    public function index(Request $request)
    {
        $query = Fournisseur::query();
        
        // Recherche multicritère
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('raison_sociale', 'like', "%$search%")
                  ->orWhere('nom_contact', 'like', "%$search%")
                  ->orWhere('email', 'like', "%$search%")
                  ->orWhere('tel', 'like', "%$search%")
                  ->orWhere('adresse', 'like', "%$search%");
            });
        }
        
        // Tri
        if ($request->has('sortBy')) {
            $query->orderBy($request->sortBy, $request->sortDirection ?? 'asc');
        }
        
        return $query->paginate($request->perPage ?? 10);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'raison_sociale' => 'required|string|max:255',
            'nom_contact' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'tel' => 'required|string|max:20',
            'adresse' => 'required|string|max:255',
        ]);

        $fournisseur = Fournisseur::create($validated);

        return response()->json($fournisseur, 201);
    }

    public function show(Fournisseur $fournisseur)
    {
        return response()->json($fournisseur);
    }

    public function update(Request $request, Fournisseur $fournisseur)
    {
        $validated = $request->validate([
            'raison_sociale' => 'sometimes|string|max:255',
            'nom_contact' => 'sometimes|string|max:255',
            'email' => 'sometimes|email|max:255',
            'tel' => 'sometimes|string|max:20',
            'adresse' => 'sometimes|string|max:255',
        ]);

        $fournisseur->update($validated);

        return response()->json($fournisseur);
    }

    public function destroy(Fournisseur $fournisseur)
    {
        $fournisseur->delete();

        return response()->json(null, 204);
    }
}