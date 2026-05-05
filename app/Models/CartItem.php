<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CartItem extends Model
{
    protected $primaryKey = 'cart_item_id';
    public $timestamps = false;

    protected $fillable = [
        'cart_id', 
        'inventory_id', 
        'quantity', 
        'price_snapshot', 
        'selected_options_snapshot'
    ];

    protected function casts(): array
    {
        return [
            'selected_options_snapshot' => 'json',
        ];
    }

    // ================= العلاقات =================
    public function cart(): BelongsTo
    {
        return $this->belongsTo(Cart::class, 'cart_id', 'cart_id');
    }

    // العنصر يعود لنسخة مخزون معينة
    public function inventory(): BelongsTo
    {
        return $this->belongsTo(Inventory::class, 'inventory_id', 'inventory_id');
    }
}