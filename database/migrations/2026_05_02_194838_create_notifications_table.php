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
        Schema::dropIfExists('notifications');
    }
};
