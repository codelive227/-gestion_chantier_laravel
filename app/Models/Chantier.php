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

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
    public function paiements()
    {
        return $this->hasMany(Paiement::class);
    }
}
