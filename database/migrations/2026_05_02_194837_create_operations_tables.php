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
        // القسم الخامس: خدمة العملاء والعمليات (Operations & System Admin)
        // ==================================================================

        // 1. جدول طلبات الاسترجاع (يعتمد على تفاصيل الطلبات والمستخدمين)
        Schema::create('return_requests', function (Blueprint $table) {
            $table->id('return_id');
            $table->foreignId('order_item_id')->constrained('order_items', 'order_item_id')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users', 'user_id')->cascadeOnDelete();
            $table->enum('status', ['pending', 'approved', 'rejected', 'completed'])->default('pending');
            $table->text('reason');
            $table->timestamp('created_at')->useCurrent();
        });

        Schema::create('reviews', function (Blueprint $table) {
            $table->id('review_id');
            $table->foreignId('user_id')->constrained('users', 'user_id')->cascadeOnDelete();
            $table->foreignId('order_item_id')->constrained('order_items', 'order_item_id')->cascadeOnDelete();
            $table->tinyInteger('rating')->unsigned(); 
            $table->text('comment')->nullable();
            $table->timestamp('created_at')->useCurrent();
            
            $table->unique(['user_id', 'order_item_id']);
        });

        // 3. جدول سجلات التدقيق "Audit Logs" (يعتمد على المستخدمين)
        Schema::create('audit_logs', function (Blueprint $table) {
            $table->id('log_id');
            $table->foreignId('user_id')->nullable()->constrained('users', 'user_id')->nullOnDelete();
            $table->string('action');
            $table->string('entity_type');
            $table->unsignedBigInteger('entity_id');
            $table->enum('status', ['success', 'failed']);
            $table->string('ip_address')->nullable();
            $table->string('user_agent')->nullable();
            $table->json('details')->nullable();
            $table->timestamp('created_at')->useCurrent();
            
            $table->index(['entity_type', 'entity_id']);
        });

        // 4. جدول الإشعارات (يعتمد على المستخدمين)
        Schema::create('notifications', function (Blueprint $table) {
            $table->id('notification_id');
            $table->foreignId('user_id')->constrained('users', 'user_id')->cascadeOnDelete();
            $table->enum('type', ['order', 'system', 'promotion']);
            $table->unsignedBigInteger('reference_id')->nullable();
            $table->string('title');
            $table->text('message');
            $table->boolean('is_sent')->default(false);
            $table->boolean('is_read')->default(false);
            $table->timestamp('created_at')->useCurrent();
            
            $table->index(['user_id', 'is_read']);
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // الترتيب العكسي للحذف
        Schema::dropIfExists('notifications');
        Schema::dropIfExists('audit_logs');
        Schema::dropIfExists('reviews');
        Schema::dropIfExists('return_requests');
    }
};
