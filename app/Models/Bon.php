<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bon extends Model
{
    use HasFactory;

    protected $fillable = [
        'num_bon',
        'fournisseur_id',
        'mode_reglement',
        'regle'
    ];

    protected $casts = [
        'regle' => 'boolean',
    ];

    // Relation avec le fournisseur
    public function fournisseur()
    {
        return $this->belongsTo(Fournisseur::class);
    }

    // Relation many-to-many avec matières premières (si nécessaire)
    public function matieresPremieres()
    {
        return $this->belongsToMany(MatierePremiere::class, 'bon_matiere_premiere')
                   ->withPivot('quantite', 'prix_unitaire')
                   ->withTimestamps();
    }

    // Méthode pour marquer comme payé
    public function marquerCommePaye()
    {
        $this->update(['regle' => true]);
    }

    // Scope pour les bons réglés
    public function scopeRegles($query)
    {
        return $query->where('regle', true);
    }

    // Scope pour les bons non réglés
    public function scopeNonRegles($query)
    {
        return $query->where('regle', false);
    }
}