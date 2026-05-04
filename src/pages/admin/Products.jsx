// src/pages/admin/Products.jsx
import { useState } from 'react'
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from 'lucide-react'
import { products } from '@/lib/mockData'
import { formatCurrency } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'

const stockStatus = (stock) => {
  if (stock > 50) return { label: 'In Stock', variant: 'success' }
  if (stock > 10) return { label: 'Low Stock', variant: 'warning' }
  return { label: 'Out of Stock', variant: 'danger' }
}

function AddProductModal({ isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Product" className="max-w-xl">
      <div className="space-y-4">
        <Input label="Product Name" placeholder="Enter product name" />
        
        <div className="grid grid-cols-2 gap-4">
          <Input label="Price" type="number" placeholder="0.00" />
          <Input label="SKU" placeholder="SKU-001" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Stock" type="number" placeholder="0" />
          <Select 
            label="Category"
            options={[
              { value: 'footwear', label: 'Footwear' },
              { value: 'accessories', label: 'Accessories' },
              { value: 'bags', label: 'Bags' },
              { value: 'electronics', label: 'Electronics' },
              { value: 'clothing', label: 'Clothing' },
            ]}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Description</label>
          <textarea 
            rows={3}
            placeholder="Enter product description"
            className="w-full px-3 py-2 rounded-[10px] border border-gray-200 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 resize-none"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <Button variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button className="flex-1" onClick={onClose}>Add Product</Button>
        </div>
      </div>
    </Modal>
  )
}

function ProductActions({ product }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  return (
    <div className="relative">
      <button 
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-[6px] transition-colors"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {dropdownOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)} />
          <div className="absolute right-0 mt-1 w-36 bg-white rounded-[10px] border border-gray-200 shadow-lg py-1 z-20">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <Eye className="w-4 h-4" />
              View
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <Edit className="w-4 h-4" />
              Edit
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState('')
  const [modalOpen, setModalOpen] = useState(false)

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <Button onClick={() => setModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-[14px] border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-gray-200 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <div className="flex gap-3">
            <select className="h-10 px-4 rounded-[10px] border border-gray-200 text-sm bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20">
              <option value="">All Categories</option>
              <option value="footwear">Footwear</option>
              <option value="accessories">Accessories</option>
              <option value="bags">Bags</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
            </select>
            <select className="h-10 px-4 rounded-[10px] border border-gray-200 text-sm bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20">
              <option value="">All Status</option>
              <option value="in-stock">In Stock</option>
              <option value="low-stock">Low Stock</option>
              <option value="out-of-stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-[14px] border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>SKU</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => {
              const status = stockStatus(product.stock)
              return (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-10 h-10 rounded-[6px] object-cover"
                      />
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-500">{product.sku}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(product.price)}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </TableCell>
                  <TableCell>
                    <ProductActions product={product} />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">1-{filteredProducts.length}</span> of{' '}
            <span className="font-medium">{filteredProducts.length}</span> products
          </p>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>

      {/* Add Product Modal */}
      <AddProductModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  )
}
