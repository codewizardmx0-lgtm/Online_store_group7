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
        Schema::create('order_items', function (Blueprint $table) {
            $table->id('order_item_id');
            $table->foreignId('order_id')->constrained('orders', 'order_id')->cascadeOnDelete();
            $table->foreignId('inventory_id')->nullable()->constrained('inventory', 'inventory_id')->nullOnDelete();
            $table->integer('quantity');
            $table->decimal('price_at_purchase', 10, 2);
            $table->string('product_name_snapshot');
            $table->string('sku_snapshot');
            $table->json('selected_options_snapshot');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('order_items');
    }
};
