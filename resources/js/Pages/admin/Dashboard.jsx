// src/pages/admin/Dashboard.jsx
import { DollarSign, ShoppingCart, Package, RotateCcw, TrendingUp, ArrowUpRight } from 'lucide-react'
import { Link } from '@inertiajs/react'
import { useStore } from '@/context/StoreContext'
import { useAuth } from '@/context/AuthContext'
import { formatCurrency } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

const STATUS_COLORS = { pending: 'warning', completed: 'success', cancelled: 'error' }

function StatCard({ title, value, sub, icon: Icon, color, to }) {
  const card = (
    <div className={`bg-white rounded-[14px] border border-gray-200 p-6 hover:shadow-md transition-shadow ${to ? 'cursor-pointer' : ''}`}>
      <div className="flex items-center justify-between mb-4">
        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
        {to && <ArrowUpRight className="w-4 h-4 text-gray-400" />}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm font-medium text-gray-700 mt-1">{title}</p>
      {sub && <p className="text-xs text-gray-500 mt-0.5">{sub}</p>}
    </div>
  )
  return to ? <Link href={to}>{card}</Link> : card
}

export default function Dashboard() {
  const { products, orders, returns, catalogs } = useStore()
  const { user } = useAuth()

  const totalRevenue = orders.reduce((s, o) => s + (o.grandTotal || o.total || 0), 0)
  const pendingOrders = orders.filter(o => o.status === 'pending').length
  const pendingReturns = returns.filter(r => r.status === 'pending').length
  const recentOrders = orders.slice(0, 5)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back, {user?.name || 'Admin'}!</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={formatCurrency(totalRevenue)} icon={DollarSign} color="bg-green-100 text-green-600" />
        <StatCard title="Total Orders" value={orders.length} sub={`${pendingOrders} pending`} icon={ShoppingCart} color="bg-blue-100 text-blue-600" to="/admin/orders" />
        <StatCard title="Total Products" value={products.length} sub={`${catalogs.length} catalogs`} icon={Package} color="bg-purple-100 text-purple-600" to="/admin/products" />
        <StatCard title="Returns" value={returns.length} sub={`${pendingReturns} pending`} icon={RotateCcw} color="bg-orange-100 text-orange-600" to="/admin/returns" />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-[14px] border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="font-semibold text-gray-900">Recent Orders</h3>
          <Link href="/admin/orders" className="text-sm text-purple-600 hover:text-purple-700 font-medium">View all</Link>
        </div>
        {recentOrders.length === 0 ? (
          <div className="px-6 py-10 text-center text-gray-400 text-sm">No orders yet</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Order ID</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Customer</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Total</th>
                <th className="text-left px-6 py-3 font-medium text-gray-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentOrders.map(o => (
                <tr key={o.id} className="hover:bg-gray-50">
                  <td className="px-6 py-3 font-mono text-xs text-gray-700">{o.id}</td>
                  <td className="px-6 py-3 text-gray-900">{o.customerName || o.email || 'Guest'}</td>
                  <td className="px-6 py-3 font-medium text-gray-900">{formatCurrency(o.grandTotal || o.total || 0)}</td>
                  <td className="px-6 py-3"><Badge variant={STATUS_COLORS[o.status] || 'default'}>{o.status}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Quick Stats Row */}
      <div className="grid sm:grid-cols-3 gap-6">
        {/* Top Products */}
        <div className="sm:col-span-2 bg-white rounded-[14px] border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-900">Products by Stock</h3>
            <Link href="/admin/products" className="text-sm text-purple-600 hover:text-purple-700 font-medium">Manage</Link>
          </div>
          <div className="divide-y divide-gray-100">
            {products.slice(0, 5).map(p => (
              <div key={p.id} className="flex items-center gap-3 px-6 py-3">
                {p.image
                  ? <img src={p.image} alt={p.name} className="w-8 h-8 rounded-[6px] object-cover bg-gray-100" />
                  : <div className="w-8 h-8 bg-gray-100 rounded-[6px] flex items-center justify-center"><Package className="w-4 h-4 text-gray-400" /></div>
                }
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.category}</p>
                </div>
                <span className={`text-sm font-medium ${p.stock === 0 ? 'text-red-600' : p.stock <= 10 ? 'text-orange-600' : 'text-gray-900'}`}>
                  {p.stock} in stock
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mini bar chart */}
        <div className="bg-white rounded-[14px] border border-gray-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            <h3 className="font-semibold text-gray-900 text-sm">Sales Trend</h3>
          </div>
          <div className="flex items-end gap-1.5 h-28">
            {[40, 55, 35, 60, 48, 70, 52, 65, 44, 72, 58, 80].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-purple-600 rounded-t-[3px] hover:bg-purple-700 transition-colors" style={{ height: `${v}%` }} />
                <span className="text-[9px] text-gray-400">{['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
