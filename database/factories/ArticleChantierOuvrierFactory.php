<?php

namespace Database\Factories;

use App\Models\ArticleChantierOuvrier;
use App\Models\Ouvrier;
use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleChantierOuvrierFactory extends Factory {
    public function definition() {
        return [
            'article_chantier_id' => ArticleChantierOuvrier::factory(),
            'ouvrier_id'         => Ouvrier::factory(),
            'date_debut'        => $this->faker->date(),
            'date_fin'          => $this->faker->date(),
        ];
    }
}
