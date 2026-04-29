// src/components/ui/StatCard.jsx
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export default function StatCard({ title, value, change, changeType = 'positive', icon: Icon, className }) {
  const isPositive = changeType === 'positive'
  
  return (
    <div className={cn(
      'bg-white rounded-[14px] border border-gray-200 p-6',
      'hover:shadow-md transition-shadow duration-200',
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{value}</p>
          {change && (
            <div className="mt-2 flex items-center gap-1">
              {isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
              <span className={cn(
                'text-sm font-medium',
                isPositive ? 'text-green-600' : 'text-red-600'
              )}>
                {change}%
              </span>
              <span className="text-sm text-gray-500">vs last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-3 bg-purple-100 rounded-[10px]">
            <Icon className="w-5 h-5 text-purple-600" />
          </div>
        )}
      </div>
    </div>
  )
}
