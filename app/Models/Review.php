<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Review extends Model
{
    protected $primaryKey = 'review_id';
    const UPDATED_AT = null; // الجدول يحتوي على created_at فقط

    protected $fillable = [
        'user_id', 
        'order_item_id', 
        'rating', 
        'comment'
    ];

    protected function casts(): array
    {
        return [
            'rating' => 'integer', // تحويل من tinyint إلى integer عادي
        ];
    }

    // ================= العلاقات =================
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    // التقييم يرتبط بالمنتج المشترى داخل الطلب نفسه للتأكد من الشراء الفعلي (Verified Purchase)
    public function orderItem(): BelongsTo
    {
        return $this->belongsTo(OrderItem::class, 'order_item_id', 'order_item_id');
    }
}