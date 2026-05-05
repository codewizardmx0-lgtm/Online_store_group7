<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use Notifiable;

    protected $table = 'users';
    protected $primaryKey = 'user_id';
    
    protected $fillable = [
        'full_name',
        'email',
        'password',
        'role',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password'          => 'hashed',
        ];
    }

    // ==================================================================
    // 🔗 العلاقات (Relationships)
    // ==================================================================
    
    // المستخدم له عناوين كثيرة (واحد لكثير)
    public function addresses()
    {
        return $this->hasMany(Address::class, 'user_id', 'user_id');
    }

    /** هل هذا المستخدم أدمن؟ */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    // استبدال دالة الإشعارات الافتراضية لترتبط بجدولنا المخصص
    public function notifications()
    {
        return $this->hasMany(Notification::class, 'user_id', 'user_id');
    }

    // إضافة علاقة التقييمات
    public function reviews()
    {
        return $this->hasMany(Review::class, 'user_id', 'user_id');
    }
}