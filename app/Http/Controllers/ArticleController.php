<?php
namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index(Request $request)
    {
        $query = Article::query();
        
        // Recherche multicritère
        if ($request->has('search')) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('reference', 'like', "%$search%")
                  ->orWhere('designation', 'like', "%$search%")
                  ->orWhere('cout', 'like', "%$search%")
                  ->orWhere('unite', 'like', "%$search%");
                  
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
            'reference' => 'sometimes|string|max:255',
            'designation' => 'sometimes|string|max:255',
            'unite' => 'sometimes|string|max:20',
            'cout' => 'sometimes|string|max:40',
           
        ]);


        $article = Article::create($validated);

        return response()->json($article, 201);
    }

    public function show(Article $article)
    {
        return response()->json($article);
    }

    public function update(Request $request, Article $article)
    {
        $validated = $request->validate([
            'reference' => 'sometimes|string|max:255',
            'designation' => 'sometimes|string|max:255',
            'unite' => 'sometimes|string|max:20',
            'cout' => 'sometimes|string|max:40',
           
        ]);

        $article->update($validated);

        return response()->json($article);
    }

    public function destroy(Article $article)
    {
        $article->delete();

        return response()->json(null, 204);
    }
}