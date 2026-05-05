<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Address extends Model
{
    // 1. تحديد اسم المفتاح الأساسي لأننا لم نستخدم 'id' الافتراضي
    protected $primaryKey = 'address_id';

    // 2. إيقاف التحديث التلقائي للوقت (لأن جدول العناوين في الـ ERD لا يحتوي على created_at و updated_at)
    public $timestamps = false;

    // 3. الحقول القابلة للإدخال
    protected $fillable = [
        'user_id',
        'city',
        'street',
        'details',
        'phone_number',
        'postal_code',
        'is_default',
    ];

    // 4. تحويل نوع البيانات (Casting)
    protected function casts(): array
    {
        return [
            'is_default' => 'boolean', // لارافل سيتعامل معه كـ true/false بدلاً من 1/0
        ];
    }

    // ==================================================================
    // 🔗 العلاقات (Relationships)
    // ==================================================================
    // العنوان ينتمي لمستخدم واحد (كثير لواحد)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}