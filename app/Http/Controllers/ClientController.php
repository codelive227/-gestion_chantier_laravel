<?php
namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class ClientController extends Controller
{
    public function index(Request $request)
    {
        $query = Client::query();

        if ($request->has('search')) {
            $search = $request->search;
            $query->where('nom', 'like', "%$search%")
                  ->orWhere('prenom', 'like', "%$search%");
        }

        return $query->paginate(5);
    }

    public function show($id)
{
    try {
        $client = Client::find($id);
        
        if (!$client) {
            return response()->json(['message' => 'Client non trouvé'], 404);
        }
        
        return response()->json($client);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Erreur serveur',
            'error' => $e->getMessage()
        ], 500);
    }
}

public function store(Request $request)
{
    $validated = $request->validate([
        'nom' => 'required|string|max:255',
        'prenom' => 'required|string|max:255',
        'email' => 'required|email|max:255|unique:clients,email',
        'telephone' => 'required|string|max:15',
        'adresse' => 'required|string|max:255',
        'type_client' => 'required|string|in:Particulier,Entreprise,Autre',
    ]);

    try {
        $client = Client::create($validated);
        return response()->json($client, 201);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Erreur lors de la création',
            'error' => $e->getMessage()
        ], 500);
    }
}

    public function update(Request $request, Client $client)
    {
        $client->update($request->all());
        return response()->json(['message' => 'Client mis à jour']);
    }

    public function destroy(Client $client)
    {
        $client->delete();
        return response()->json(['message' => 'Client supprimé']);
    }
}
