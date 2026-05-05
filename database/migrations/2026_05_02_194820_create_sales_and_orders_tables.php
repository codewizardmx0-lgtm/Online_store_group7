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
        // القسم الرابع: المبيعات، السلة، والطلبات (Sales, Cart & Orders System)
        // ==================================================================

        // 1. جدول الكوبونات (مستقل في هذا القسم)
        Schema::create('coupons', function (Blueprint $table) {
            $table->id('coupon_id');
            $table->string('code')->unique();
            $table->enum('discount_type', ['percentage', 'fixed']);
            $table->decimal('discount_value', 10, 2);
            $table->decimal('min_order', 10, 2)->nullable();
            $table->date('expires_at');
            $table->integer('usage_limit')->nullable();
            $table->integer('per_user_limit')->default(1);
        });

        // 2. جدول سلة التسوق (يعتمد على المستخدمين)
        Schema::create('carts', function (Blueprint $table) {
            $table->id('cart_id');
            $table->foreignId('user_id')->nullable()->constrained('users', 'user_id')->cascadeOnDelete();
            $table->string('session_id')->nullable()->unique();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });

        // 3. جدول عناصر السلة (يعتمد على السلة والمخزون)
        Schema::create('cart_items', function (Blueprint $table) {
            $table->id('cart_item_id');
            $table->foreignId('cart_id')->constrained('carts', 'cart_id')->cascadeOnDelete();
            $table->foreignId('inventory_id')->constrained('inventory', 'inventory_id')->cascadeOnDelete();
            $table->integer('quantity');
            $table->decimal('price_snapshot', 10, 2);
            $table->json('selected_options_snapshot')->nullable();
            
            $table->unique(['cart_id', 'inventory_id']);
        });

        // 4. جدول المفضلة (يعتمد على المستخدمين والمنتجات)
        Schema::create('wishlists', function (Blueprint $table) {
            $table->id('wishlist_id');
            $table->foreignId('user_id')->constrained('users', 'user_id')->cascadeOnDelete();
            $table->foreignId('product_id')->constrained('products', 'product_id')->cascadeOnDelete();
            $table->enum('added_from', ['web', 'mobile']);
            $table->timestamp('created_at')->useCurrent();
            
            $table->unique(['user_id', 'product_id']);
        });

        // 5. جدول الطلبات (يعتمد على المستخدمين، العناوين، والكوبونات)
        Schema::create('orders', function (Blueprint $table) {
            $table->id('order_id');
            $table->foreignId('user_id')->constrained('users', 'user_id');
            $table->foreignId('address_id')->constrained('addresses', 'address_id');
            $table->foreignId('coupon_id')->nullable()->constrained('coupons', 'coupon_id')->nullOnDelete();
            $table->decimal('subtotal', 10, 2);
            $table->decimal('discount_amount', 10, 2)->default(0);
            $table->decimal('tax_amount', 10, 2)->default(0);
            $table->decimal('shipping_fee', 10, 2)->default(0);
            $table->decimal('total_amount', 10, 2);
            $table->string('currency_code')->default('SAR');
            $table->enum('payment_method', ['cod', 'credit_card']); 
            $table->string('payment_transaction_id')->nullable();
            $table->enum('current_status', ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'])->default('pending');
            $table->timestamp('created_at')->useCurrent();

            $table->index(['user_id', 'created_at']);
        });

        // 6. جدول تفاصيل الطلب - المنتجات المشتراة (يعتمد على الطلبات والمخزون)
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

        // 7. جدول تاريخ حالات الطلب (يعتمد على الطلبات والمستخدمين)
        Schema::create('order_status_history', function (Blueprint $table) {
            $table->id('history_id');
            $table->foreignId('order_id')->constrained('orders', 'order_id')->cascadeOnDelete();
            $table->enum('status', ['pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded']);
            $table->foreignId('changed_by')->nullable()->constrained('users', 'user_id')->nullOnDelete();
            $table->timestamp('changed_at')->useCurrent();
        });

        // 8. جدول تتبع استخدام الكوبونات (يعتمد على الكوبونات، المستخدمين، والطلبات)
        Schema::create('coupon_usages', function (Blueprint $table) {
            $table->id();
            $table->foreignId('coupon_id')->constrained('coupons', 'coupon_id')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users', 'user_id')->cascadeOnDelete();
            $table->foreignId('order_id')->constrained('orders', 'order_id')->cascadeOnDelete();
            
            $table->unique(['coupon_id', 'user_id', 'order_id']);
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // الترتيب العكسي بدقة (الاعتماديات المعقدة أولاً)
        Schema::dropIfExists('coupon_usages');
        Schema::dropIfExists('order_status_history');
        Schema::dropIfExists('order_items');
        Schema::dropIfExists('orders');
        Schema::dropIfExists('wishlists');
        Schema::dropIfExists('cart_items');
        Schema::dropIfExists('carts');
        Schema::dropIfExists('coupons');
    }
};