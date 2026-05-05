<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InventoryLock extends Model
{
    protected $primaryKey = 'lock_id';
    public $timestamps = false; // الجدول لا يحتوي على created_at / updated_at

    protected $fillable = [
        'inventory_id', 
        'user_id', 
        'session_id', 
        'locked_at', 
        'expires_at'
    ];

    // تحويل التواريخ ليقرأها لارافل ككائنات Carbon لتسهيل التعامل معها
    protected function casts(): array
    {
        return [
            'locked_at' => 'datetime',
            'expires_at' => 'datetime',
        ];
    }

    // ================= العلاقات =================
    // 1. القفل مرتبط بنسخة مخزون معينة
    public function inventory(): BelongsTo
    {
        return $this->belongsTo(Inventory::class, 'inventory_id', 'inventory_id');
    }

    // 2. القفل يعود لمستخدم معين (يمكن أن يكون null إذا كان زائراً)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}