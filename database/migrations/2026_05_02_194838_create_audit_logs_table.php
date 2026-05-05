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
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('audit_logs');
    }
};
