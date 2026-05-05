<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Notification extends Model
{
    protected $primaryKey = 'notification_id';
    const UPDATED_AT = null;

    protected $fillable = [
        'user_id', 
        'type', 
        'reference_id', 
        'title', 
        'message', 
        'is_sent', 
        'is_read'
    ];

    protected function casts(): array
    {
        return [
            'is_sent' => 'boolean',
            'is_read' => 'boolean',
        ];
    }

    // ================= العلاقات =================
    // المستخدم الذي سيستلم الإشعار
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}