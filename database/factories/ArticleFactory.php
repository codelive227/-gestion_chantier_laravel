<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class ArticleFactory extends Factory {
    public function definition() {
        return [
            'reference'   => $this->faker->unique()->bothify('ART-####'),
            'designation' => $this->faker->sentence(3),
            'unite'      => $this->faker->randomElement(['kg', 'm', 'L', 'pièce']),
            'cout'       => $this->faker->randomFloat(2, 10, 500),
        ];
    }
}
