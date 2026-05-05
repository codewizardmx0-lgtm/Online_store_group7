// src/pages/admin/Orders.jsx
import { useState } from 'react'
import { ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react'
import { useStore } from '@/context/StoreContext'
import { useToast } from '@/context/ToastContext'
import { formatCurrency } from '@/lib/utils'
import Badge from '@/components/ui/Badge'

const STATUS_COLORS = {
  pending:   'warning',
  completed: 'success',
  cancelled: 'error',
}

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useStore()
  const { addToast } = useToast()
  const [expanded, setExpanded] = useState(null)

  const toggle = (id) => setExpanded(prev => prev === id ? null : id)

  const handleStatus = (id, status) => {
    updateOrderStatus(id, status)
    addToast(`Order ${id} marked as ${status}.`, 'success')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Orders</h1>
        <p className="text-gray-500 text-sm">{orders.length} total order{orders.length !== 1 ? 's' : ''}</p>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-[14px] border border-gray-200 p-12 text-center">
          <ShoppingCart className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <p className="font-medium text-gray-900">No orders yet</p>
          <p className="text-sm text-gray-500">Orders placed by customers will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map(order => (
            <div key={order.id} className="bg-white rounded-[14px] border border-gray-200 overflow-hidden">
              {/* Order Row */}
              <div
                className="flex items-center gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggle(order.id)}
              >
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 font-mono text-sm">#{order.id}</p>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {new Date(order.createdAt).toLocaleDateString()} · {order.customerName || order.email || 'Guest'}
                  </p>
                </div>
                <div className="text-right mr-4">
                  <p className="font-semibold text-gray-900">{formatCurrency(order.grandTotal || order.total)}</p>
                  <p className="text-xs text-gray-500">{(order.items || []).length} item{(order.items || []).length !== 1 ? 's' : ''}</p>
                </div>
                <Badge variant={STATUS_COLORS[order.status] || 'default'}>
                  {order.status}
                </Badge>
                <div className="ml-2 text-gray-400">
                  {expanded === order.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Expanded Details */}
              {expanded === order.id && (
                <div className="border-t border-gray-100 px-6 py-5 space-y-4 bg-gray-50/50">
                  {/* Items */}
                  <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Items</p>
                    <div className="space-y-2">
                      {(order.items || []).map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                          {item.image && <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-[6px] bg-gray-100" />}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{item.name}</p>
                            <p className="text-xs text-gray-500">{item.selectedColor} / {item.selectedSize} × {item.quantity}</p>
                          </div>
                          <span className="text-sm font-medium text-gray-900">{formatCurrency(item.price * item.quantity)}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Totals + Address */}
                  <div className="grid sm:grid-cols-2 gap-4 pt-3 border-t border-gray-200">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Totals</p>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatCurrency(order.subtotal || 0)}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Shipping</span><span className={order.shipping === 0 ? 'text-green-600' : ''}>{order.shipping === 0 ? 'Free' : formatCurrency(order.shipping || 0)}</span></div>
                        <div className="flex justify-between"><span className="text-gray-500">Tax</span><span>{formatCurrency(order.tax || 0)}</span></div>
                        <div className="flex justify-between font-semibold border-t border-gray-200 pt-1 mt-1"><span>Total</span><span>{formatCurrency(order.grandTotal || order.total || 0)}</span></div>
                      </div>
                    </div>
                    {order.address && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Ship To</p>
                        <p className="text-sm text-gray-700">
                          {order.address.addressLine}<br />
                          {order.address.city}, {order.address.country} {order.address.zip}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Status Actions */}
                  <div className="flex gap-2 pt-2">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide self-center mr-2">Update:</p>
                    {['pending','completed','cancelled'].filter(s => s !== order.status).map(s => (
                      <button key={s} onClick={() => handleStatus(order.id, s)}
                        className="px-3 py-1.5 text-xs font-medium rounded-[6px] border border-gray-200 bg-white hover:bg-gray-50 capitalize transition-colors">
                        Mark {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
