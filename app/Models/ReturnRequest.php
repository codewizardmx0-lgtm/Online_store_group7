<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ReturnRequest extends Model
{
    protected $primaryKey = 'return_id';
    const UPDATED_AT = null; // الجدول يحتوي على created_at فقط

    protected $fillable = [
        'order_item_id', 
        'user_id', 
        'status', 
        'reason'
    ];

    // ================= العلاقات =================
    // طلب الاسترجاع مرتبط بعنصر معين من الطلب
    public function orderItem(): BelongsTo
    {
        return $this->belongsTo(OrderItem::class, 'order_item_id', 'order_item_id');
    }

    // المستخدم الذي طلب الاسترجاع
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}