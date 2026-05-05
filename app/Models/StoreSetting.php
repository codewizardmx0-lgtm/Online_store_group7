<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StoreSetting extends Model
{
    // 1. تحديد اسم المفتاح الأساسي
    protected $primaryKey = 'setting_id';

    // 2. إيقاف الـ timestamps (غير موجودة في المخطط)
    public $timestamps = false;

    // 3. الحقول القابلة للإدخال
    protected $fillable = [
        'setting_key',
        'type',
        'setting_value',
    ];
}