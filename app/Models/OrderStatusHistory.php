<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderStatusHistory extends Model
{
    // تحديد اسم الجدول صراحة
    protected $table = 'order_status_history';
    protected $primaryKey = 'history_id';
    public $timestamps = false;

    protected $fillable = [
        'order_id', 
        'status', 
        'changed_by', 
        'changed_at'
    ];

    protected function casts(): array
    {
        return [
            'changed_at' => 'datetime',
        ];
    }

    // ================= العلاقات =================
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id', 'order_id');
    }

    // المستخدم أو الإدمن الذي قام بتغيير حالة الطلب
    public function changer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'changed_by', 'user_id');
    }
}