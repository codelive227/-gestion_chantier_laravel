<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class OuvrierFactory extends Factory {
    public function definition() {
        return [
            'nom'               => $this->faker->lastName,
            'prenom'            => $this->faker->firstName,
            'statut'            => $this->faker->randomElement(['Interne', 'Externe']),
            'salaire_journalier' => $this->faker->randomFloat(2, 100, 300),
        ];
    }
}