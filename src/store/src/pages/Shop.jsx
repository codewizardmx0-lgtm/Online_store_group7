// src/pages/Shop.jsx
import { useState } from 'react'
import { SlidersHorizontal, Grid, List, ChevronDown, X } from 'lucide-react'
import { products, categories } from '@/lib/mockData'
import { cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import ProductCard from '@/components/ui/ProductCard'
import Select from '@/components/ui/Select'

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
]

const priceRanges = [
  { value: 'all', label: 'All Prices' },
  { value: '0-50', label: 'Under $50' },
  { value: '50-100', label: '$50 - $100' },
  { value: '100-200', label: '$100 - $200' },
  { value: '200+', label: 'Over $200' },
]

function FilterSidebar({ isOpen, onClose, filters, setFilters }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={cn(
        'fixed top-0 left-0 z-50 h-full w-72 bg-white border-r border-gray-200 p-6 overflow-y-auto',
        'transform transition-transform duration-200 ease-in-out',
        'lg:relative lg:translate-x-0 lg:z-auto lg:h-auto lg:border-0 lg:p-0',
        isOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center justify-between mb-6 lg:hidden">
          <h3 className="font-semibold text-gray-900">Filters</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h4 className="font-medium text-gray-900 mb-4">Categories</h4>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.category === 'all'}
                onChange={() => setFilters({ ...filters, category: 'all' })}
                className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="text-sm text-gray-600 group-hover:text-gray-900">All Categories</span>
            </label>
            {categories.map((cat) => (
              <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.category === cat.name.toLowerCase()}
                  onChange={() => setFilters({ ...filters, category: cat.name.toLowerCase() })}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">{cat.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div className="mb-8">
          <h4 className="font-medium text-gray-900 mb-4">Price Range</h4>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label key={range.value} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="price"
                  checked={filters.price === range.value}
                  onChange={() => setFilters({ ...filters, price: range.value })}
                  className="w-4 h-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">{range.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="mb-8">
          <h4 className="font-medium text-gray-900 mb-4">Rating</h4>
          <div className="space-y-2">
            {[4, 3, 2, 1].map((rating) => (
              <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => setFilters({ ...filters, rating })}
                  className="w-4 h-4 border-gray-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-gray-600 group-hover:text-gray-900">{rating}+ Stars</span>
              </label>
            ))}
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => setFilters({ category: 'all', price: 'all', rating: 0 })}
        >
          Clear Filters
        </Button>
      </aside>
    </>
  )
}

export default function Shop() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [viewMode, setViewMode] = useState('grid')
  const [sortBy, setSortBy] = useState('featured')
  const [filters, setFilters] = useState({
    category: 'all',
    price: 'all',
    rating: 0,
  })

  // Filter products based on filters
  const filteredProducts = products.filter((product) => {
    if (filters.category !== 'all' && product.category.toLowerCase() !== filters.category) {
      return false
    }
    if (filters.rating > 0 && product.rating < filters.rating) {
      return false
    }
    if (filters.price !== 'all') {
      const [min, max] = filters.price.split('-').map(Number)
      if (max && (product.price < min || product.price > max)) return false
      if (!max && filters.price === '200+' && product.price < 200) return false
    }
    return true
  })

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shop All Products</h1>
        <p className="text-gray-500">Showing {filteredProducts.length} products</p>
      </div>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar 
            isOpen={filterOpen} 
            onClose={() => setFilterOpen(false)} 
            filters={filters}
            setFilters={setFilters}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
            <button 
              onClick={() => setFilterOpen(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-[10px] border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 lg:hidden"
            >
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>

            <div className="flex items-center gap-4 ml-auto">
              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 hidden sm:inline">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 px-3 pr-8 rounded-[6px] border border-gray-200 text-sm bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                >
                  {sortOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* View Toggle */}
              <div className="hidden sm:flex items-center border border-gray-200 rounded-[6px] p-1">
                <button 
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    'p-1.5 rounded-[4px] transition-colors',
                    viewMode === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'
                  )}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setViewMode('list')}
                  className={cn(
                    'p-1.5 rounded-[4px] transition-colors',
                    viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'
                  )}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Active Filters */}
          {(filters.category !== 'all' || filters.price !== 'all' || filters.rating > 0) && (
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <span className="text-sm text-gray-500">Active filters:</span>
              {filters.category !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                  {filters.category}
                  <button onClick={() => setFilters({ ...filters, category: 'all' })}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.price !== 'all' && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                  {priceRanges.find(r => r.value === filters.price)?.label}
                  <button onClick={() => setFilters({ ...filters, price: 'all' })}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
              {filters.rating > 0 && (
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-sm">
                  {filters.rating}+ Stars
                  <button onClick={() => setFilters({ ...filters, rating: 0 })}>
                    <X className="w-3 h-3" />
                  </button>
                </span>
              )}
            </div>
          )}

          {/* Product Grid */}
          <div className={cn(
            'grid gap-6',
            viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'
          )}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 mb-4">No products found matching your filters.</p>
              <Button 
                variant="outline"
                onClick={() => setFilters({ category: 'all', price: 'all', rating: 0 })}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="flex items-center justify-center gap-2 mt-12">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="primary" size="sm">1</Button>
              <Button variant="outline" size="sm">2</Button>
              <Button variant="outline" size="sm">3</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Sidebar */}
      <FilterSidebar 
        isOpen={filterOpen} 
        onClose={() => setFilterOpen(false)} 
        filters={filters}
        setFilters={setFilters}
      />
    </div>
  )
}
