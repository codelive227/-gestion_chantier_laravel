<?php

namespace Database\Factories;

use App\Models\Chantier;
use Illuminate\Database\Eloquent\Factories\Factory;

class PaiementFactory extends Factory {
    public function definition() {
        return [
            'chantier_id'   => Chantier::factory(),
            'mode_reglement' => $this->faker->randomElement(['Virement', 'Chèque', 'Espèces']),
            'date_paiement' => $this->faker->date(),
            'montant'      => $this->faker->randomFloat(2, 1000, 10000),
        ];
    }
}
