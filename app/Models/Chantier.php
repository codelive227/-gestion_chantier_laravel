<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chantier extends Model
{
    use HasFactory;

    protected $fillable = [
        'designation',
        'type_chantier',
        'etat',
        'client_id',
        'localisation',
        'date_debut',
        'date_estime',
    ];

 
    public function paiements()
    {
        return $this->hasMany(Paiement::class);
    }

public function client()
{
    return $this->belongsTo(Client::class);
}

public function articles()
{
    return $this->belongsToMany(Article::class, 'article_chantiers');
}

public function ouvriers()
{
    return $this->hasManyThrough(Ouvrier::class, ArticleChantierOuvrier::class, 'chantier_id', 'id', 'id', 'ouvrier_id');
}

}
