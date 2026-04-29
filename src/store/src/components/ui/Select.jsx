// src/components/ui/Select.jsx
import { forwardRef } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

const Select = forwardRef(({ className, label, options = [], placeholder = 'Select...', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={cn(
            'w-full h-10 px-3 pr-10 rounded-[10px] border border-gray-200 bg-white text-gray-900',
            'text-sm appearance-none cursor-pointer',
            'transition-all duration-200',
            'focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20',
            'disabled:bg-gray-50 disabled:cursor-not-allowed',
            className
          )}
          {...props}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  )
})

Select.displayName = 'Select'

export default Select
