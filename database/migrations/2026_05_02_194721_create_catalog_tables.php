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
        // القسم الثاني: كتالوج المنتجات والخصائص (Catalog System)
        // ==================================================================

        // 1. الجداول المستقلة (الأقسام والخصائص)
        Schema::create('categories', function (Blueprint $table) {
            $table->id('category_id');
            $table->string('name');
            $table->foreignId('parent_id')->nullable()->constrained('categories', 'category_id')->nullOnDelete();
        });
        Schema::create('attributes', function (Blueprint $table) {
            $table->id('attribute_id');
            $table->string('name');
            $table->enum('type', ['text', 'number', 'select']);
            $table->boolean('is_required')->default(false);
        });
        // 2. الجداول المعتمدة على المستوى الأول
        Schema::create('attribute_options', function (Blueprint $table) {
            $table->id('option_id');
            $table->foreignId('attribute_id')->constrained('attributes', 'attribute_id')->cascadeOnDelete();
            $table->string('value');
        });
        Schema::create('category_attributes', function (Blueprint $table) {
            $table->id();

            $table->foreignId('category_id')
                ->constrained('categories', 'category_id')
                ->cascadeOnDelete();

            $table->foreignId('attribute_id')
                ->constrained('attributes', 'attribute_id')
                ->cascadeOnDelete();

            // منع تكرار نفس الربط
            $table->unique(['category_id', 'attribute_id']);

            // تحسين الأداء للاستعلامات العكسية
            $table->index('attribute_id');
        });
        Schema::create('products', function (Blueprint $table) {
            $table->id('product_id');
            $table->foreignId('category_id')->constrained('categories', 'category_id')->cascadeOnDelete();
            $table->string('name');
            $table->decimal('base_price', 10, 2);
            $table->enum('status', ['active', 'hidden', 'out_of_stock'])->default('active');
            $table->timestamp('created_at')->useCurrent();
            
            $table->index('category_id');
        });
        // 3. الجداول المعتمدة على المنتجات
        Schema::create('product_images', function (Blueprint $table) {
            $table->id('image_id');
            $table->foreignId('product_id')->constrained('products', 'product_id')->cascadeOnDelete();
            $table->string('image_url');
            $table->integer('sort_order')->default(0);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // الترتيب العكسي
        Schema::dropIfExists('product_images');
        Schema::dropIfExists('products');
        Schema::dropIfExists('category_attributes');
        Schema::dropIfExists('attribute_options');
        Schema::dropIfExists('attributes');
        Schema::dropIfExists('categories');   
    }
};