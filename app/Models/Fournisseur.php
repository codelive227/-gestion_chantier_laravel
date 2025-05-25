<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Fournisseur extends Model
{
    use HasFactory;
    //
    protected $guarded = ['id'];
    public function bons()
{
    return $this->hasMany(Bon::class);
}
}
