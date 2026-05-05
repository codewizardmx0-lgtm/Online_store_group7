<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Coupon extends Model
{
    protected $primaryKey = 'coupon_id';
    public $timestamps = false;

    protected $fillable = [
        'code', 
        'discount_type', 
        'discount_value', 
        'min_order', 
        'expires_at', 
        'usage_limit', 
        'per_user_limit'
    ];

    protected function casts(): array
    {
        return [
            'expires_at' => 'date',
        ];
    }

    // ================= العلاقات =================
    // الطلبات التي استخدمت هذا الكوبون
    public function orders(): HasMany
    {
        return $this->hasMany(Order::class, 'coupon_id', 'coupon_id');
    }

    // سجل استخدامات هذا الكوبون
    public function usages(): HasMany
    {
        return $this->hasMany(CouponUsage::class, 'coupon_id', 'coupon_id');
    }
}