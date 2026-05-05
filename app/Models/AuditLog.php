<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AuditLog extends Model
{
    protected $primaryKey = 'log_id';
    const UPDATED_AT = null;

    protected $fillable = [
        'user_id', 
        'action', 
        'entity_type', 
        'entity_id', 
        'status', 
        'ip_address', 
        'user_agent', 
        'details'
    ];

    protected function casts(): array
    {
        return [
            'details' => 'json',
        ];
    }

    // ================= العلاقات =================
    // المستخدم الذي قام بالحركة (قد يكون null إذا كانت الحركة من زائر غير مسجل)
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}