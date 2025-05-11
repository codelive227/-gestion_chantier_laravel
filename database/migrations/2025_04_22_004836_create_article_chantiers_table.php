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
        Schema::create('article_chantier', function (Blueprint $table) {
            $table->id();
            $table->foreignId('articles')->constrained('articles')->onDelete('cascade');
            $table->foreignId('chantier_id')->constrained('chantiers')->onDelete('cascade');
            $table->timestamps();
        });
        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('article_chantiers');
    }
};
