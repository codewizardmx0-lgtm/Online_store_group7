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
        Schema::create('category_attributes', function (Blueprint $table) {
            $table->id();

            $table->foreignId('category_id')
                ->constrained('categories', 'category_id')
                ->cascadeOnDelete();

            $table->foreignId('attribute_id')
                ->constrained('attributes', 'attribute_id')
                ->cascadeOnDelete();

            // منع تكرار نفس الربط
            $table->unique(['category_id', 'attribute_id']);

            // تحسين الأداء للاستعلامات العكسية
            $table->index('attribute_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_attributes');
    }
};
