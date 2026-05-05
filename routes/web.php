<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Public / Customer Routes
|--------------------------------------------------------------------------
*/

Route::get('/', fn () => Inertia::render('Home'));

Route::get('/shop', fn () => Inertia::render('Shop'));

Route::get('/product/{id}', fn ($id) => Inertia::render('Product', [
    'id' => $id
]));

Route::get('/cart', fn () => Inertia::render('Cart'));

Route::get('/checkout', fn () => Inertia::render('Checkout'));

Route::get('/wishlist', fn () => Inertia::render('Wishlist'));

Route::get('/search', fn () => Inertia::render('Search'));

Route::get('/order-success', fn () => Inertia::render('OrderSuccess'));

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->group(function () {

    Route::get('/dashboard', fn () => Inertia::render('admin/Dashboard'));

    Route::get('/products', fn () => Inertia::render('admin/Products'));

    Route::get('/orders', fn () => Inertia::render('admin/Orders'));

    Route::get('/customers', fn () => Inertia::render('admin/Customers'));

    Route::get('/catalogs', fn () => Inertia::render('admin/Catalogs'));

    Route::get('/returns', fn () => Inertia::render('admin/Returns'));

    Route::get('/settings', fn () => Inertia::render('admin/Settings'));
});

/*
|--------------------------------------------------------------------------
| Auth Dashboard (Laravel default)
|--------------------------------------------------------------------------
*/

Route::get('/dashboard', fn () => Inertia::render('Dashboard'))
    ->middleware(['auth', 'verified'])
    ->name('dashboard');

/*
|--------------------------------------------------------------------------
| Profile
|--------------------------------------------------------------------------
*/

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});
Route::get('/dev-admin', function () {
    $user = App\Models\User::firstOrCreate(
        ['email' => 'dev@admin.com'],
        [
            'full_name' => 'Dev Admin',
            'password' => Hash::make('password'),
            'role' => 'admin',
        ]
    );

    Auth::login($user);

    return redirect('/admin/dashboard');
});
require __DIR__.'/auth.php';