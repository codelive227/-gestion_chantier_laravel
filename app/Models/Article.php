<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Article extends Model
{
    //
    use HasFactory;
    protected $guarded = ['id'];

public function chantiers()
{
    return $this->belongsToMany(Chantier::class, 'article_chantiers', 'articles', 'chantier_id');
}
public function ouvriers()
{
    return $this->belongsToMany(Ouvrier::class, 'article_chantier_ouvriers');
}

}
