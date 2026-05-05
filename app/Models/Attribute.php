<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Attribute extends Model
{
    protected $primaryKey = 'attribute_id';
    public $timestamps = false;

    protected $fillable = ['name', 'type', 'is_required'];

    protected function casts(): array
    {
        return [
            'is_required' => 'boolean',
        ];
    }

    // ================= العلاقات =================
    // 1. خيارات هذه الخاصية (مثلاً خاصية "اللون" لها خيارات "أحمر"، "أزرق")
    public function options(): HasMany
    {
        return $this->hasMany(AttributeOption::class, 'attribute_id', 'attribute_id');
    }

    // 2. التصنيفات المرتبطة بهذه الخاصية
    public function categories(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'category_attributes', 'attribute_id', 'category_id');
    }
}