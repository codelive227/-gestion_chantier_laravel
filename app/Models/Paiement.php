<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Paiement extends Model
{
    //
    use HasFactory;
  protected $fillable = ['chantier_id', 'mode_reglement', 'date_paiement', 'montant'];


    public function chantier()
    {
        return $this->belongsTo(Chantier::class);
    }
}
