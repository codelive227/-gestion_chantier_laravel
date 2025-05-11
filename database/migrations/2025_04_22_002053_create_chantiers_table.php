<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('chantiers', function (Blueprint $table) {
            $table->id();
            $table->string('designation');
            $table->string('type_chantier');
            $table->enum('etat', ['En attente', 'En cours', 'Terminé']);
            $table->foreignId('client_id')->constrained('clients');
            $table->text('localisation');
            $table->date('date_debut');
            $table->date('date_estime');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('chantiers');
    }
};
