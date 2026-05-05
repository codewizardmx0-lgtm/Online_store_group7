<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use App\Models\Category;
use App\Models\Product;
use App\Models\Inventory;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. تنظيف الجداول القديمة
        Schema::disableForeignKeyConstraints();
        DB::table('users')->truncate();
        DB::table('categories')->truncate();
        DB::table('products')->truncate();
        DB::table('inventory')->truncate();
        Schema::enableForeignKeyConstraints();

        // 2. إنشاء مدير النظام
        User::create([
            'full_name' => 'المدير العام',
            'email' => 'admin@test.com',
            'password' => bcrypt('123456'),
            'role' => 'admin',
        ]);

        // 3. إنشاء 10 مستخدمين وهميين
        User::factory(10)->create();

        // 4. إنشاء تصنيفات يدوية
        $electronics = Category::create(['name' => 'إلكترونيات']);
        Category::create(['name' => 'لابتوبات', 'parent_id' => $electronics->category_id]);
        Category::create(['name' => 'شاشات', 'parent_id' => $electronics->category_id]);

        // 5. إنشاء 20 منتج وهمي مع المخزون الخاص بهم
        Product::factory(20)->create()->each(function ($product) {
            Inventory::create([
                'product_id' => $product->product_id,
                'sku' => 'SKU-' . rand(1000, 9999),
                'quantity' => rand(5, 50),
                'price_adjustment' => 0
            ]);
        });

        $this->command->info('تم بنجاح: إضافة مستخدمين، تصنيفات، ومنتجات! 🚀');
    }
}