<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Factories\HasFactory; // 👈 أضفنا هذا

class Category extends Model
{    
    use HasFactory; // 👈 أضفنا هذا
    protected $primaryKey = 'category_id';
    public $timestamps = false;

    protected $fillable = ['name', 'parent_id'];

    // ================= العلاقات =================
    // 1. التصنيف الأب (التصنيف الرئيسي الذي يتبعه هذا التصنيف)
    public function parent(): BelongsTo
    {
        return $this->belongsTo(Category::class, 'parent_id', 'category_id');
    }

    // 2. التصنيفات الأبناء (التصنيفات الفرعية التابعة لهذا التصنيف)
    public function children(): HasMany
    {
        return $this->hasMany(Category::class, 'parent_id', 'category_id');
    }

    // 3. المنتجات التابعة لهذا التصنيف
    public function products(): HasMany
    {
        return $this->hasMany(Product::class, 'category_id', 'category_id');
    }

    // 4. الخصائص المرتبطة بهذا التصنيف (علاقة متعدد لمتعدد عبر الجدول الوسيط)
    public function attributes(): BelongsToMany
    {
        return $this->belongsToMany(
            Attribute::class, 
            'category_attributes', // اسم الجدول الوسيط
            'category_id',         // المفتاح الأجنبي لهذا المودل
            'attribute_id'         // المفتاح الأجنبي للمودل الآخر
        );
    }
}