<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'category_id' => \App\Models\Category::inRandomOrder()->first()->category_id ?? \App\Models\Category::factory(),
            'name' => $this->faker->words(3, true),
            'base_price' => $this->faker->randomFloat(2, 50, 5000),
            'status' => $this->faker->randomElement(['active', 'active', 'out_of_stock']),
            'created_at' => $this->faker->dateTimeBetween('-1 year', 'now'),
        ];
    }
}
