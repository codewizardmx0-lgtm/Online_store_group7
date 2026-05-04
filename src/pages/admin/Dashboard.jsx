// src/pages/admin/Dashboard.jsx
import { DollarSign, ShoppingCart, Users, TrendingUp, ArrowUpRight, ArrowDownRight, MoreHorizontal } from 'lucide-react'
import { orders, dashboardStats } from '@/lib/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'
import StatCard from '@/components/ui/StatCard'
import Badge from '@/components/ui/Badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table'
import Button from '@/components/ui/Button'

const statusColors = {
  'Delivered': 'success',
  'Shipped': 'info',
  'Processing': 'warning',
  'Pending': 'default',
}

function RecentOrders() {
  const recentOrders = orders.slice(0, 5)

  return (
    <div className="bg-white rounded-[14px] border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Recent Orders</h3>
        <Button variant="ghost" size="sm">View All</Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customerName}</TableCell>
              <TableCell className="text-gray-500">{formatDate(order.date)}</TableCell>
              <TableCell>{formatCurrency(order.total)}</TableCell>
              <TableCell>
                <Badge variant={statusColors[order.status]}>{order.status}</Badge>
              </TableCell>
              <TableCell>
                <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function TopProducts() {
  const topProducts = [
    { name: 'Classic White Sneakers', sales: 142, revenue: 18463.58, growth: 12.5 },
    { name: 'Minimalist Watch', sales: 89, revenue: 22249.11, growth: 8.3 },
    { name: 'Leather Crossbody Bag', sales: 76, revenue: 14439.24, growth: -2.1 },
    { name: 'Wireless Headphones', sales: 64, revenue: 19199.36, growth: 15.7 },
  ]

  return (
    <div className="bg-white rounded-[14px] border border-gray-200 overflow-hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h3 className="font-semibold text-gray-900">Top Products</h3>
        <Button variant="ghost" size="sm">View All</Button>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {topProducts.map((product, idx) => (
            <div key={idx} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-[6px] bg-purple-100 flex items-center justify-center text-sm font-medium text-purple-600">
                {idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-gray-900 truncate">{product.name}</p>
                <p className="text-sm text-gray-500">{product.sales} sales</p>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{formatCurrency(product.revenue)}</p>
                <div className="flex items-center justify-end gap-1">
                  {product.growth > 0 ? (
                    <>
                      <ArrowUpRight className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-600">+{product.growth}%</span>
                    </>
                  ) : (
                    <>
                      <ArrowDownRight className="w-3 h-3 text-red-500" />
                      <span className="text-xs text-red-600">{product.growth}%</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SalesChart() {
  // Mock chart data visualization
  const data = [45, 52, 38, 65, 48, 58, 74, 55, 68, 72, 65, 80]
  const max = Math.max(...data)
  
  return (
    <div className="bg-white rounded-[14px] border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-gray-900">Sales Overview</h3>
          <p className="text-sm text-gray-500">Monthly revenue performance</p>
        </div>
        <select className="h-8 px-3 rounded-[6px] border border-gray-200 text-sm bg-white focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20">
          <option>Last 12 months</option>
          <option>Last 6 months</option>
          <option>Last 30 days</option>
        </select>
      </div>
      
      {/* Simple bar chart */}
      <div className="flex items-end gap-2 h-48">
        {data.map((value, idx) => (
          <div key={idx} className="flex-1 flex flex-col items-center gap-2">
            <div 
              className="w-full bg-purple-600 rounded-t-[4px] transition-all hover:bg-purple-700"
              style={{ height: `${(value / max) * 100}%` }}
            />
            <span className="text-xs text-gray-500">
              {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][idx]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here&apos;s what&apos;s happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={formatCurrency(dashboardStats.totalRevenue)}
          change={dashboardStats.revenueGrowth}
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Total Orders"
          value={dashboardStats.totalOrders.toLocaleString()}
          change={dashboardStats.ordersGrowth}
          changeType="positive"
          icon={ShoppingCart}
        />
        <StatCard
          title="Total Customers"
          value={dashboardStats.totalCustomers.toLocaleString()}
          change={dashboardStats.customersGrowth}
          changeType="positive"
          icon={Users}
        />
        <StatCard
          title="Avg. Order Value"
          value={formatCurrency(dashboardStats.avgOrderValue)}
          change={dashboardStats.avgOrderGrowth}
          changeType="positive"
          icon={TrendingUp}
        />
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart />
        </div>
        <TopProducts />
      </div>

      {/* Recent Orders */}
      <RecentOrders />
    </div>
  )
}
