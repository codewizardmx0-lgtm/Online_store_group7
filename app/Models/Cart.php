<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Cart extends Model
{
    protected $primaryKey = 'cart_id';
    
    // الجدول يحتوي على updated_at فقط بناءً على الـ ERD
    const CREATED_AT = null;

    protected $fillable = ['user_id', 'session_id'];

    // ================= العلاقات =================
    // السلة تعود لمستخدم (وقد تكون null إذا كان زائراً يستخدم session_id)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    // عناصر هذه السلة
    public function items(): HasMany
    {
        return $this->hasMany(CartItem::class, 'cart_id', 'cart_id');
    }
}