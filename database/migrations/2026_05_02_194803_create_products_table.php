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
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');
            $table->foreignId('category_id')->constrained('categories', 'category_id')->cascadeOnDelete();
            $table->string('name');
            $table->decimal('base_price', 10, 2);
            $table->enum('status', ['active', 'hidden', 'out_of_stock'])->default('active');
            $table->timestamp('created_at')->useCurrent();
            
            $table->index('category_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
