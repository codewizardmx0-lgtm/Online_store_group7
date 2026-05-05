<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AttributeOption extends Model
{
    protected $primaryKey = 'option_id';
    public $timestamps = false;

    protected $fillable = ['attribute_id', 'value'];

    // ================= العلاقات =================
    // هذه القيمة تنتمي لخاصية معينة
    public function attribute(): BelongsTo
    {
        return $this->belongsTo(Attribute::class, 'attribute_id', 'attribute_id');
    }
}