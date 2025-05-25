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
        Schema::create('article_chantier_ouvriers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('article_chantier_id')->constrained('article_chantiers')->onDelete('cascade');
            $table->foreignId('ouvrier_id')->constrained('ouvriers')->onDelete('cascade');
            $table->date('date_debut');
            $table->date('date_fin');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article_chantier_ouvriers');
    }
};
