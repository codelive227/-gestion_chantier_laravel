<?php

// app/Models/ArticleChantier.php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ArticleChantier extends Model
{
    use HasFactory;

    protected $fillable = ['articles', 'chantier_id'];

    // Relation vers Article
    public function article()
    {
        return $this->belongsTo(Article::class, 'articles'); // 'articles' est la clé étrangère
    }

    // Relation vers Chantier
    public function chantier()
    {
        return $this->belongsTo(Chantier::class);
    }

    // Relation vers les ouvriers via la seconde table pivot
    public function ouvriers()
    {
        return $this->belongsToMany(Ouvrier::class, 'article_chantier_ouvrier')
                    ->withPivot('date_debut', 'date_fin')
                    ->using(ArticleChantierOuvrier::class);
    }
}