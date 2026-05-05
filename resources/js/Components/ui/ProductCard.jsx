// src/components/ui/ProductCard.jsx
import { useState } from 'react'
import { Link } from '@inertiajs/react'
import { ShoppingCart, Heart, Check } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useToast } from '@/context/ToastContext'
import RatingStars from './RatingStars'
import Button from './Button'

export default function ProductCard({ product, className }) {
  const { addToCart } = useCart()
  const { isWishlisted, toggleWishlist } = useWishlist()
  const { addToast } = useToast()
  const [added, setAdded] = useState(false)

  const wishlisted = isWishlisted(product.id)

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedColor: product.colors?.[0] ?? 'Default',
      selectedSize: product.sizes?.[0] ?? 'One Size',
      quantity: 1,
    })
    addToast(`${product.name} added to cart!`, 'success')
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  const handleWishlist = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleWishlist(product)
    addToast(
      wishlisted
        ? `${product.name} removed from wishlist.`
        : `${product.name} saved to wishlist!`,
      wishlisted ? 'info' : 'success'
    )
  }

  return (
    <div className={cn(
      'group bg-white rounded-[14px] border border-gray-200 overflow-hidden',
      'hover:shadow-lg hover:border-gray-300 transition-all duration-300',
      className
    )}>
      <Link href={`/product/${product.id}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <button
          onClick={handleWishlist}
          className={cn(
            'absolute top-3 right-3 p-2 rounded-full shadow-sm transition-all',
            wishlisted
              ? 'bg-red-50 opacity-100'
              : 'bg-white/90 backdrop-blur opacity-0 group-hover:opacity-100 hover:bg-white'
          )}
        >
          <Heart
            className={cn(
              'w-4 h-4 transition-colors',
              wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600 hover:text-red-500'
            )}
          />
        </button>
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <p className="text-xs font-medium text-purple-600 mb-1">{product.category}</p>
          <h3 className="font-medium text-gray-900 mb-2 line-clamp-1 hover:text-purple-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center gap-2 mb-3">
          <RatingStars rating={product.rating} size="sm" />
          <span className="text-xs text-gray-500">({product.rating})</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-900">
            {formatCurrency(product.price)}
          </span>
          <Button size="sm" className="gap-1" onClick={handleQuickAdd}>
            {added ? (
              <><Check className="w-4 h-4" />Added</>
            ) : (
              <><ShoppingCart className="w-4 h-4" />Add</>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
