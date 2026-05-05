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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
