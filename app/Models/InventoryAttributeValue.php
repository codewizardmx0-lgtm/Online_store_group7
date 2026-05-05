<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class InventoryAttributeValue extends Model
{
    // اسم الجدول
    protected $table = 'inventory_attribute_values';
    public $timestamps = false;

    protected $fillable = ['inventory_id', 'option_id'];

    // ================= العلاقات =================
    public function inventory(): BelongsTo
    {
        return $this->belongsTo(Inventory::class, 'inventory_id', 'inventory_id');
    }

    public function option(): BelongsTo
    {
        return $this->belongsTo(AttributeOption::class, 'option_id', 'option_id');
    }
}