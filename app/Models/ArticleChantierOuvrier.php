<?php

// app/Models/ArticleChantierOuvrier.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\Pivot;

class ArticleChantierOuvrier extends Pivot // Étend Pivot au lieu de Model
{
    use HasFactory;

    protected $table = 'article_chantier_ouvrier';

    protected $fillable = [
        'article_chantier_id',
        'ouvrier_id',
        'date_debut',
        'date_fin'
    ];

    // Optionnel : relations si besoin d'accéder aux modèles parents
    public function articleChantier()
    {
        return $this->belongsTo(ArticleChantier::class);
    }

    public function ouvrier()
    {
        return $this->belongsTo(Ouvrier::class);
    }
}