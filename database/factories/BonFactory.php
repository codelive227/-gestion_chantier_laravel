<?php

namespace Database\Factories;

use App\Models\Fournisseur;
use Illuminate\Database\Eloquent\Factories\Factory;

class BonFactory extends Factory {
    public function definition() {
        return [
            'num_bon'       => $this->faker->unique()->numberBetween(1000, 9999),
            'fournisseur_id' => Fournisseur::factory(),
            'mode_reglement' => $this->faker->randomElement(['Virement', 'Chèque']),
            'regle'         => $this->faker->boolean,
        ];
    }
}
