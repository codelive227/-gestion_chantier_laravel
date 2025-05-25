<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class MatierePremiere extends Model
{
    //
    use HasFactory;
    protected $guarded = ['id'];
    public function bons()
{
    return $this->belongsToMany(Bon::class, 'bon_matiere_premiere')
               ->withPivot('quantite', 'prix_unitaire');
}
}
