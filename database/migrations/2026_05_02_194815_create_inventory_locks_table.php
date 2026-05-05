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
        Schema::dropIfExists('inventory_locks');
    }
};
