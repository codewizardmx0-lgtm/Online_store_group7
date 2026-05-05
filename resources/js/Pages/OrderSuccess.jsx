import { useEffect, useState } from 'react'
import { Link, router, usePage } from '@inertiajs/react'
import { CheckCircle, Package, ArrowRight, Home, RotateCcw } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { useStore } from '@/context/StoreContext'
import { useAuth } from '@/context/AuthContext'
import { useToast } from '@/context/ToastContext'
import Button from '@/components/ui/Button'

function ReturnModal({ order, onClose, onSubmit }) {
  const [reason, setReason] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!reason.trim()) {
      setError('Please describe the reason for return.')
      return
    }
    onSubmit(reason)
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-[14px] p-6 w-full max-w-md">
        <h3 className="font-semibold mb-2">Request Return</h3>
        <p className="text-sm text-gray-500 mb-4">Order #{order.id}</p>

        <textarea
          className="w-full border rounded p-2"
          rows={4}
          value={reason}
          onChange={(e) => {
            setReason(e.target.value)
            setError('')
          }}
        />

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <div className="flex justify-end gap-3 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={() => onSubmit(reason)}>Submit</Button>
        </div>
      </div>
    </div>
  )
}

export default function OrderSuccess() {
  const { props } = usePage()
  const { orders } = useStore()
  const { user } = useAuth()
  const { addToast } = useToast()

  const latestOrder = orders.length ? orders[orders.length - 1] : null
  const order = props.order ?? latestOrder

  const [showReturnModal, setShowReturnModal] = useState(false)
  const [returnSubmitted, setReturnSubmitted] = useState(false)

  useEffect(() => {
    if (!order) router.visit('/')
  }, [order])

  if (!order) return null

  const handleReturnSubmit = (reason) => {
    addToast('Return request submitted', 'success')
    setShowReturnModal(false)
    setReturnSubmitted(true)
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      {showReturnModal && (
        <ReturnModal
          order={order}
          onClose={() => setShowReturnModal(false)}
          onSubmit={handleReturnSubmit}
        />
      )}

      <div className="max-w-lg w-full">
        <h1 className="text-center text-3xl font-bold mb-6">
          Order Confirmed
        </h1>

        <div className="bg-white p-6 border rounded mb-6">
          <p>Order ID: {order.id}</p>
          <p>Total: {formatCurrency(order.grandTotal)}</p>
        </div>

        <div className="flex gap-3">
          <Link href="/">
            <Button variant="outline">
              <Home className="w-4 h-4" />
              Home
            </Button>
          </Link>

          <Link href="/shop">
            <Button>
              Continue Shopping
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}