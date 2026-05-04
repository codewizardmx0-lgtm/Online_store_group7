// src/components/ui/RatingStars.jsx
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function RatingStars({ rating, maxRating = 5, size = 'md', showValue = false, className }) {
  const sizes = {
    sm: 'w-3 h-3',
    md: 'w-4 h-4',
    lg: 'w-5 h-5',
  }

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[...Array(maxRating)].map((_, index) => {
        const filled = index < Math.floor(rating)
        const partial = !filled && index < rating
        
        return (
          <Star
            key={index}
            className={cn(
              sizes[size],
              filled ? 'fill-yellow-400 text-yellow-400' : 
              partial ? 'fill-yellow-400/50 text-yellow-400' : 
              'fill-gray-200 text-gray-200'
            )}
          />
        )
      })}
      {showValue && (
        <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
      )}
    </div>
  )
}
