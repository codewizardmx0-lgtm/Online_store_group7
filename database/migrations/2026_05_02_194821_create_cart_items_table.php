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
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id('cart_item_id');
            $table->foreignId('cart_id')->constrained('carts', 'cart_id')->cascadeOnDelete();
            $table->foreignId('inventory_id')->constrained('inventory', 'inventory_id')->cascadeOnDelete();
            $table->integer('quantity');
            $table->decimal('price_snapshot', 10, 2);
            $table->json('selected_options_snapshot')->nullable();
            
            $table->unique(['cart_id', 'inventory_id']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cart_items');
    }
};
