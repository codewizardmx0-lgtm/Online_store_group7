<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProductImage extends Model
{
    protected $primaryKey = 'image_id';
    public $timestamps = false;

    protected $fillable = ['product_id', 'image_url', 'sort_order'];

    // ================= العلاقات =================
    // الصورة تنتمي لمنتج معين
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }
}