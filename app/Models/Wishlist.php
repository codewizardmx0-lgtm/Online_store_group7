<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Wishlist extends Model
{
    protected $primaryKey = 'wishlist_id';
    const UPDATED_AT = null; // الجدول يحتوي على created_at فقط

    protected $fillable = ['user_id', 'product_id', 'added_from'];

    // ================= العلاقات =================
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class, 'product_id', 'product_id');
    }
}