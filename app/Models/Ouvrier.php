<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ouvrier extends Model
{
    use HasFactory;

  // App\Models\Ouvrier.php
protected $fillable = ['nom', 'prenom', 'statut', 'salaire_journalier']; 
 
}
