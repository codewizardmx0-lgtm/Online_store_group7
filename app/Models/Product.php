<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Product extends Model
{
    protected $primaryKey = 'product_id';
    
    // إخبار لارافل بعدم وجود حقل updated_at
    const UPDATED_AT = null;

    protected $fillable = ['category_id', 'name', 'base_price', 'status'];

    // ================= العلاقات =================
    // 1. المنتج ينتمي لتصنيف معين
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'category_id', 'category_id');
    }

    // 2. المنتج يمتلك عدة صور
    public function images(): HasMany
    {
        return $this->hasMany(ProductImage::class, 'product_id', 'product_id');
    }
}