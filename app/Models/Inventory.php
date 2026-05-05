<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Inventory extends Model
{
    // تحديد اسم الجدول بشكل صريح لمنع لارافل من البحث عن inventories
    protected $table = 'inventory';
    protected $primaryKey = 'inventory_id';
    public $timestamps = false;

    protected $fillable = ['product_id', 'sku', 'quantity', 'price_adjustment'];

    // ================= العلاقات =================
    // 1. المخزون يعود لمنتج معين
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }

    // 2. خيارات الخصائص المرتبطة بهذه النسخة من المخزون (عبر الجدول الوسيط)
    public function options(): BelongsToMany
    {
        return $this->belongsToMany(
            AttributeOption::class, 
            'inventory_attribute_values', // الجدول الوسيط
            'inventory_id',               // مفتاح المخزون
            'option_id'                   // مفتاح الخيار
        );
    }

    // 3. أقفال المخزون (حجوزات السلة المؤقتة)
    public function locks(): HasMany
    {
        return $this->hasMany(InventoryLock::class, 'inventory_id', 'inventory_id');
    }
}