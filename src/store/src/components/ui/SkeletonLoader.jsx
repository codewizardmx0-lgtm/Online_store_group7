// src/components/ui/SkeletonLoader.jsx
import { cn } from '@/lib/utils'

export default function SkeletonLoader({ className, variant = 'rectangle' }) {
  const baseClasses = 'animate-pulse bg-gray-200 rounded-[6px]'
  
  const variants = {
    rectangle: 'h-4 w-full',
    circle: 'h-10 w-10 rounded-full',
    card: 'h-48 w-full rounded-[14px]',
    avatar: 'h-12 w-12 rounded-full',
    text: 'h-3 w-3/4',
    button: 'h-10 w-24 rounded-[10px]',
  }

  return (
    <div className={cn(baseClasses, variants[variant], className)} />
  )
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-[14px] border border-gray-200 overflow-hidden">
      <SkeletonLoader variant="card" className="h-56" />
      <div className="p-4 space-y-3">
        <SkeletonLoader variant="text" />
        <SkeletonLoader variant="rectangle" className="w-1/2" />
        <SkeletonLoader variant="rectangle" className="w-1/3" />
      </div>
    </div>
  )
}
