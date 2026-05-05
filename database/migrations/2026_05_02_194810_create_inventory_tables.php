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
        // ==================================================================
        // القسم الثالث: المخزون المتقدم (Advanced Inventory System)
        // ==================================================================

        // 1. جدول المخزون الأساسي (يعتمد على المنتجات من القسم الثاني)
        Schema::create('inventory', function (Blueprint $table) {
            $table->id('inventory_id');
            $table->foreignId('product_id')->constrained('products', 'product_id')->cascadeOnDelete();
            $table->string('sku')->unique();
            $table->unsignedInteger('quantity'); // Unsigned لمنع القيم السالبة
            $table->decimal('price_adjustment', 10, 2)->default(0);
            
            $table->index('product_id');
        });
        // 2. جدول تفاصيل تركيبة المخزون (يعتمد على المخزون وخيارات الخصائص)
        Schema::create('inventory_attribute_values', function (Blueprint $table) {
            $table->id();
            $table->foreignId('inventory_id')->constrained('inventory', 'inventory_id')->cascadeOnDelete();
            $table->foreignId('option_id')->constrained('attribute_options', 'option_id')->cascadeOnDelete();
            
            $table->unique(['inventory_id', 'option_id']);
        });

      // 3. جدول أقفال المخزون (يعتمد على المخزون والمستخدمين)
        Schema::create('inventory_locks', function (Blueprint $table) {
            $table->id('lock_id');
            $table->foreignId('inventory_id')->constrained('inventory', 'inventory_id')->cascadeOnDelete();
            $table->foreignId('user_id')->nullable()->constrained('users', 'user_id')->nullOnDelete();
            $table->string('session_id')->nullable();
            $table->timestamp('locked_at')->useCurrent();
            $table->timestamp('expires_at')->nullable();
            
            $table->index(['inventory_id', 'expires_at']);
        });
    }

    /**
     * Reverse the migrations.
     */

    public function down(): void
    {
        // الترتيب العكسي للحذف لتجنب أخطاء المفاتيح الأجنبية
        Schema::dropIfExists('inventory_locks');
        Schema::dropIfExists('inventory_attribute_values');
        Schema::dropIfExists('inventory');
    }
};
