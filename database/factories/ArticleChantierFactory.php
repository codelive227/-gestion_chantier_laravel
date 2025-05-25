<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Article;
use App\Models\Chantier;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ArticleChantier>
 */
class ArticleChantierFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
  public function definition()
{
    return [
        'articles' => Article::factory(),
        'chantier_id' => Chantier::factory(),
    ];
}
}
