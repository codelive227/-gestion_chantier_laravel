<?php
namespace Database\Factories;

use App\Models\Client;
use Illuminate\Database\Eloquent\Factories\Factory;

class ChantierFactory extends Factory {
    public function definition() {
        return [
            'designation'    => $this->faker->randomElement(['Rénovation immeuble',
    'Construction maison',
    'Aménagement bureau',
    'Travaux parking',
    'Démolition bâtiment',]),
            'type_chantier' => $this->faker->randomElement(['Dalle', 'Fondation', 'Aménagement','Route','Bâtiment']),
            'etat'          => $this->faker->randomElement(['En attente', 'En cours', 'Terminé']),
            'client_id'     => Client::factory(),
            'localisation' => $this->faker->address,
            'date_debut'   => $this->faker->date(),
            'date_estime'  => $this->faker->date(),
        ];
    }
}