// src/pages/admin/Customers.jsx
import { useState } from 'react'
import { Search, MoreHorizontal, Mail, Eye, UserX, Download, Users } from 'lucide-react'
import { customers } from '@/lib/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import Button from '@/components/ui/Button'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'

function CustomerActions({ customer }) {
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
          <div className="absolute right-0 mt-1 w-40 bg-white rounded-[10px] border border-gray-200 shadow-lg py-1 z-20">
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <Eye className="w-4 h-4" />
              View Profile
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <Mail className="w-4 h-4" />
              Send Email
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
              <UserX className="w-4 h-4" />
              Deactivate
            </button>
          </div>
        </>
      )}
    </div>
  )
}

function CustomerAvatar({ name }) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase()
  const colors = [
    'bg-purple-100 text-purple-600',
    'bg-blue-100 text-blue-600',
    'bg-green-100 text-green-600',
    'bg-orange-100 text-orange-600',
    'bg-pink-100 text-pink-600',
  ]
  const colorIndex = name.charCodeAt(0) % colors.length
  
  return (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${colors[colorIndex]}`}>
      {initials}
    </div>
  )
}

export default function AdminCustomers() {
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  // Sort customers
  const sortedCustomers = [...filteredCustomers].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.joinDate) - new Date(a.joinDate)
      case 'oldest':
        return new Date(a.joinDate) - new Date(b.joinDate)
      case 'orders':
        return b.orders - a.orders
      case 'spent':
        return b.totalSpent - a.totalSpent
      default:
        return 0
    }
  })

  // Stats
  const totalCustomers = customers.length
  const totalOrders = customers.reduce((sum, c) => sum + c.orders, 0)
  const totalRevenue = customers.reduce((sum, c) => sum + c.totalSpent, 0)
  const avgOrderValue = totalRevenue / totalOrders

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-500">Manage your customer base</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-[14px] border border-gray-200 p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-[10px]">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalCustomers}</p>
              <p className="text-sm text-gray-500">Total Customers</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-[14px] border border-gray-200 p-6">
          <div>
            <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
            <p className="text-sm text-gray-500">Total Orders</p>
          </div>
        </div>
        <div className="bg-white rounded-[14px] border border-gray-200 p-6">
          <div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(totalRevenue)}</p>
            <p className="text-sm text-gray-500">Total Revenue</p>
          </div>
        </div>
        <div className="bg-white rounded-[14px] border border-gray-200 p-6">
          <div>
            <p className="text-2xl font-bold text-gray-900">{formatCurrency(avgOrderValue)}</p>
            <p className="text-sm text-gray-500">Avg. Order Value</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-[14px] border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-gray-200 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="h-10 px-4 rounded-[10px] border border-gray-200 text-sm bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="orders">Most Orders</option>
            <option value="spent">Highest Spent</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-[14px] border border-gray-200 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Orders</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <CustomerAvatar name={customer.name} />
                    <span className="font-medium text-gray-900">{customer.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-500">{customer.email}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell className="font-medium">{formatCurrency(customer.totalSpent)}</TableCell>
                <TableCell className="text-gray-500">{formatDate(customer.joinDate)}</TableCell>
                <TableCell>
                  <CustomerActions customer={customer} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty State */}
        {sortedCustomers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No customers found</p>
          </div>
        )}

        {/* Pagination */}
        {sortedCustomers.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">1-{sortedCustomers.length}</span> of{' '}
              <span className="font-medium">{sortedCustomers.length}</span> customers
            </p>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
