<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class OrderItem extends Model
{
    protected $primaryKey = 'order_item_id';
    public $timestamps = false;

    protected $fillable = [
        'order_id', 
        'inventory_id', 
        'quantity', 
        'price_at_purchase', 
        'product_name_snapshot', 
        'sku_snapshot', 
        'selected_options_snapshot'
    ];

    protected function casts(): array
    {
        return [
            'selected_options_snapshot' => 'json',
        ];
    }

    // ================= العلاقات =================
    public function order(): BelongsTo
    {
        return $this->belongsTo(Order::class, 'order_id', 'order_id');
    }

    public function inventory(): BelongsTo
    {
        return $this->belongsTo(Inventory::class, 'inventory_id', 'inventory_id');
    }
}