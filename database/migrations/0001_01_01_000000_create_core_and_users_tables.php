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
        // القسم الأول: النظام وإدارة المستخدمين (Core & Users System)
        // ==================================================================

        // 1. جدول الإعدادات (مستقل لا يعتمد على شيء)
        Schema::create('store_settings', function (Blueprint $table) {
            $table->id('setting_id');
            $table->string('setting_key')->unique();
            $table->enum('type', ['string', 'number', 'json', 'boolean']);
            $table->text('setting_value');
        });
        // 1. جدول المستخدمين حسب مخطط الـ ERD
        Schema::create('users', function (Blueprint $table) {
            $table->id('user_id'); // تم التعديل حسب المخطط
            $table->string('full_name');
            $table->string('email')->unique();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password'); // حسب المخطط (لكن يفضل في لارافل تسميته password)
            $table->enum('role', ['admin', 'customer'])->default('customer');
            $table->rememberToken();
            $table->timestamps();
        });

        // جداول لارافل الافتراضية لاستعادة كلمة المرور
        Schema::create('password_reset_tokens', function (Blueprint $table) {
            $table->string('email')->primary();
            $table->string('token');
            $table->timestamp('created_at')->nullable();
        });

        // جداول لارافل الافتراضية للجلسات
        Schema::create('sessions', function (Blueprint $table) {
            $table->string('id')->primary();
            $table->foreignId('user_id')->nullable()->references('user_id')->on('users')->cascadeOnDelete();
            $table->string('ip_address', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->longText('payload');
            $table->integer('last_activity')->index();
        });
        // 4. جدول العناوين (يعتمد على المستخدمين، لذلك تم وضعه بعدهم)
        Schema::create('addresses', function (Blueprint $table) {
            $table->id('address_id');
            $table->foreignId('user_id')->constrained('users', 'user_id')->cascadeOnDelete();
            $table->string('city');
            $table->string('street');
            $table->text('details')->nullable();
            $table->string('phone_number');
            $table->string('postal_code')->nullable();
            $table->boolean('is_default')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
        Schema::dropIfExists('sessions');
        Schema::dropIfExists('password_reset_tokens');
        Schema::dropIfExists('users');
        Schema::dropIfExists('store_settings');
    }
};