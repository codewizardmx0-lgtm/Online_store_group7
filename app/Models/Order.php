<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $primaryKey = 'order_id';
    const UPDATED_AT = null; // يحتوي على created_at فقط

    protected $fillable = [
        'user_id', 
        'address_id', 
        'coupon_id', 
        'subtotal', 
        'discount_amount', 
        'tax_amount', 
        'shipping_fee', 
        'total_amount', 
        'currency_code', 
        'payment_method', 
        'payment_transaction_id', 
        'current_status'
    ];

    // ================= العلاقات =================
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    public function address(): BelongsTo
    {
        return $this->belongsTo(Address::class, 'address_id', 'address_id');
    }

    public function coupon(): BelongsTo
    {
        return $this->belongsTo(Coupon::class, 'coupon_id', 'coupon_id');
    }

    // تفاصيل المنتجات داخل الطلب
    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class, 'order_id', 'order_id');
    }

    // تاريخ حالات الطلب (تم الدفع، جاري التجهيز، تم الشحن)
    public function statusHistory(): HasMany
    {
        return $this->hasMany(OrderStatusHistory::class, 'order_id', 'order_id');
    }
}