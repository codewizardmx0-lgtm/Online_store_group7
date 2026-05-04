// src/components/ui/ProductCard.jsx
import { Link } from 'react-router-dom'
import { ShoppingCart, Heart } from 'lucide-react'
import { cn, formatCurrency } from '@/lib/utils'
import RatingStars from './RatingStars'
import Button from './Button'

export default function ProductCard({ product, className }) {
  return (
    <div className={cn(
      'group bg-white rounded-[14px] border border-gray-200 overflow-hidden',
      'hover:shadow-lg hover:border-gray-300 transition-all duration-300',
      className
    )}>
      <Link to={`/product/${product.id}`} className="block relative">
        <div className="aspect-square overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <button className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white">
          <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
        </button>
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
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
          <Button size="sm" className="gap-1">
            <ShoppingCart className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
