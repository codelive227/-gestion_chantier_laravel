<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class MatierePremiereFactory extends Factory {
    public function definition() {
        return [
            'designation' => $this->faker->words(3, true),
        ];
    }
}