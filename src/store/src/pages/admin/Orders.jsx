// src/pages/admin/Orders.jsx
import { useState } from 'react'
import { Search, Filter, MoreHorizontal, Eye, Truck, XCircle, Download } from 'lucide-react'
import { orders } from '@/lib/mockData'
import { formatCurrency, formatDate, cn } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Badge from '@/components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'

const statusColors = {
  'Delivered': 'success',
  'Shipped': 'info',
  'Processing': 'warning',
  'Pending': 'default',
  'Cancelled': 'danger',
}

const statusTabs = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled']

function OrderActions({ order }) {
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
              View Details
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <Truck className="w-4 h-4" />
              Update Status
            </button>
            <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
              <XCircle className="w-4 h-4" />
              Cancel Order
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default function AdminOrders() {
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const [selectedOrders, setSelectedOrders] = useState([])

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          order.customerName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = activeTab === 'All' || order.status === activeTab
    return matchesSearch && matchesStatus
  })

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(filteredOrders.map(o => o.id))
    }
  }

  const toggleSelectOrder = (orderId) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId))
    } else {
      setSelectedOrders([...selectedOrders, orderId])
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
          <p className="text-gray-500">Manage and track customer orders</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statusTabs.slice(1).map((status) => {
          const count = orders.filter(o => o.status === status).length
          return (
            <div 
              key={status}
              className="bg-white rounded-[10px] border border-gray-200 p-4 text-center hover:border-purple-200 transition-colors cursor-pointer"
              onClick={() => setActiveTab(status)}
            >
              <p className="text-2xl font-bold text-gray-900">{count}</p>
              <p className="text-sm text-gray-500">{status}</p>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-[14px] border border-gray-200">
        {/* Tabs */}
        <div className="flex items-center gap-1 px-4 pt-4 overflow-x-auto">
          {statusTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-4 py-2 text-sm font-medium rounded-t-[6px] whitespace-nowrap transition-colors',
                activeTab === tab
                  ? 'text-purple-600 bg-purple-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              )}
            >
              {tab}
              {tab !== 'All' && (
                <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
                  {orders.filter(o => o.status === tab).length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-4 p-4 border-t border-gray-100">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-10 pr-4 rounded-[10px] border border-gray-200 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <select className="h-10 px-4 rounded-[10px] border border-gray-200 text-sm bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20">
            <option value="">Date Range</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>

        {/* Bulk Actions */}
        {selectedOrders.length > 0 && (
          <div className="flex items-center gap-4 px-6 py-3 bg-purple-50 border-y border-purple-100">
            <span className="text-sm text-purple-700">
              {selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''} selected
            </span>
            <Button size="sm" variant="outline">Update Status</Button>
            <Button size="sm" variant="outline">Export Selected</Button>
          </div>
        )}

        {/* Orders Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                  onChange={toggleSelectAll}
                  className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                />
              </TableHead>
              <TableHead>Order ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <input
                    type="checkbox"
                    checked={selectedOrders.includes(order.id)}
                    onChange={() => toggleSelectOrder(order.id)}
                    className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                  />
                </TableCell>
                <TableCell className="font-medium text-purple-600">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell className="text-gray-500">{formatDate(order.date)}</TableCell>
                <TableCell className="font-medium">{formatCurrency(order.total)}</TableCell>
                <TableCell>
                  <Badge variant={statusColors[order.status]}>{order.status}</Badge>
                </TableCell>
                <TableCell>
                  <OrderActions order={order} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No orders found</p>
          </div>
        )}

        {/* Pagination */}
        {filteredOrders.length > 0 && (
          <div className="flex items-center justify-between px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">1-{filteredOrders.length}</span> of{' '}
              <span className="font-medium">{filteredOrders.length}</span> orders
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
