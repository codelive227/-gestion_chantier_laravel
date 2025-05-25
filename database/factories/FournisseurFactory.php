<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class FournisseurFactory extends Factory {
    public function definition() {
        return [
            'raison_sociale' => $this->faker->company,
            'nom_contact'   => $this->faker->name,
            'email'         => $this->faker->unique()->safeEmail,
            'tel'           => $this->faker->phoneNumber,
            'adresse'      => $this->faker->address,
        ];
    }
}