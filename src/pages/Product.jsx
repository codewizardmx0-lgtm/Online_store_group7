// src/pages/Product.jsx
import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ShoppingCart, Heart, Share2, Truck, Shield, RefreshCcw, Minus, Plus, ChevronLeft, Check } from 'lucide-react'
import { products } from '@/lib/mockData'
import { cn, formatCurrency } from '@/lib/utils'
import Button from '@/components/ui/Button'
import RatingStars from '@/components/ui/RatingStars'
import ProductCard from '@/components/ui/ProductCard'
import Badge from '@/components/ui/Badge'

export default function Product() {
  const { id } = useParams()
  const product = products.find((p) => p.id === parseInt(id)) || products[0]
  
  const [selectedColor, setSelectedColor] = useState(product.colors[0])
  const [selectedSize, setSelectedSize] = useState(product.sizes[0])
  const [quantity, setQuantity] = useState(1)
  const [activeImage, setActiveImage] = useState(0)

  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  // Mock additional images
  const images = [product.image, product.image, product.image]

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm mb-8">
        <Link to="/" className="text-gray-500 hover:text-gray-700">Home</Link>
        <span className="text-gray-400">/</span>
        <Link to="/shop" className="text-gray-500 hover:text-gray-700">Shop</Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900">{product.name}</span>
      </nav>

      {/* Product Section */}
      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-white rounded-[14px] border border-gray-200 overflow-hidden">
            <img
              src={images[activeImage]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex gap-4">
            {images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={cn(
                  'w-20 h-20 rounded-[10px] border-2 overflow-hidden transition-all',
                  activeImage === idx ? 'border-purple-600' : 'border-gray-200 hover:border-gray-300'
                )}
              >
                <img src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="mb-4">
            <Badge variant="primary">{product.category}</Badge>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <RatingStars rating={product.rating} showValue />
            <span className="text-sm text-gray-500">({Math.floor(Math.random() * 100 + 50)} reviews)</span>
          </div>

          <p className="text-gray-600 mb-6">{product.description}</p>

          <div className="text-3xl font-bold text-gray-900 mb-8">
            {formatCurrency(product.price)}
          </div>

          {/* Color Selection */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3">
              Color: <span className="font-normal text-gray-600">{selectedColor}</span>
            </h4>
            <div className="flex gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    'px-4 py-2 rounded-[6px] border text-sm font-medium transition-all',
                    selectedColor === color
                      ? 'border-purple-600 bg-purple-50 text-purple-600'
                      : 'border-gray-200 text-gray-700 hover:border-gray-300'
                  )}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
          {product.sizes.length > 1 && (
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Size: <span className="font-normal text-gray-600">{selectedSize}</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      'w-12 h-10 rounded-[6px] border text-sm font-medium transition-all',
                      selectedSize === size
                        ? 'border-purple-600 bg-purple-50 text-purple-600'
                        : 'border-gray-200 text-gray-700 hover:border-gray-300'
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-8">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Quantity</h4>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-gray-200 rounded-[10px]">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2.5 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {product.stock > 10 ? (
                  <span className="text-green-600">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-orange-600">Only {product.stock} left</span>
                )}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mb-8">
            <Button size="lg" className="flex-1 gap-2">
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </Button>
            <Button variant="outline" size="lg" className="px-4">
              <Heart className="w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-4">
              <Share2 className="w-5 h-5" />
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-2 bg-purple-100 rounded-[6px]">
                <Truck className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-xs text-gray-600">Free Shipping</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-2 bg-purple-100 rounded-[6px]">
                <RefreshCcw className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-xs text-gray-600">30-Day Returns</span>
            </div>
            <div className="flex flex-col items-center text-center gap-2">
              <div className="p-2 bg-purple-100 rounded-[6px]">
                <Shield className="w-4 h-4 text-purple-600" />
              </div>
              <span className="text-xs text-gray-600">Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="bg-white rounded-[14px] border border-gray-200 p-8 mb-16">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-gray-600 text-sm leading-relaxed">
              {product.description} This product is crafted with premium materials ensuring durability 
              and comfort. Perfect for everyday use, it combines style with functionality.
            </p>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Specifications</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">SKU</span>
                <span className="text-gray-900">{product.sku}</span>
              </li>
              <li className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Category</span>
                <span className="text-gray-900">{product.category}</span>
              </li>
              <li className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-500">Available Colors</span>
                <span className="text-gray-900">{product.colors.join(', ')}</span>
              </li>
              <li className="flex justify-between py-2">
                <span className="text-gray-500">Available Sizes</span>
                <span className="text-gray-900">{product.sizes.join(', ')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
