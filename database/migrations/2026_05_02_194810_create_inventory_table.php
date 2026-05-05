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
        Schema::create('inventory', function (Blueprint $table) {
            $table->id('inventory_id');
            $table->foreignId('product_id')->constrained('products', 'product_id')->cascadeOnDelete();
            $table->string('sku')->unique();
            $table->unsignedInteger('quantity'); // Unsigned لمنع القيم السالبة
            $table->decimal('price_adjustment', 10, 2)->default(0);
            
            $table->index('product_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inventory');
    }
};
