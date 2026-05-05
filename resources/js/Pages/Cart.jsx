// src/pages/Cart.jsx
import { useState } from 'react'
import { Link } from '@inertiajs/react'
import { Minus, Plus, X, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useToast } from '@/context/ToastContext'
import { formatCurrency } from '@/lib/utils'
import Button from '@/components/ui/Button'

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <div className="flex gap-4 py-6 border-b border-gray-100 last:border-0">
      <Link href={`/product/${item.id}`} className="flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-24 h-24 object-cover rounded-[10px] bg-gray-100"
        />
      </Link>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between gap-4">
          <div>
            <Link
              href={`/product/${item.id}`}
              className="font-medium text-gray-900 hover:text-purple-600 transition-colors line-clamp-1"
            >
              {item.name}
            </Link>
            <p className="text-sm text-gray-500 mt-1">
              {item.selectedColor} / {item.selectedSize}
            </p>
          </div>
          <button
            onClick={onRemove}
            className="p-1 text-gray-400 hover:text-red-500 transition-colors flex-shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center border border-gray-200 rounded-[6px]">
            <button
              onClick={onDecrease}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
            <button
              onClick={onIncrease}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <span className="font-medium text-gray-900">
            {formatCurrency(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  )
}

function OrderSummary({ subtotal, shipping, total, cartEmpty }) {
  const [couponCode, setCouponCode] = useState('')

  return (
    <div className="bg-white rounded-[14px] border border-gray-200 p-6 sticky top-24">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>

      {/* Coupon Input */}
      <div className="mb-6">
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-full h-10 pl-10 pr-3 rounded-[10px] border border-gray-200 text-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
            />
          </div>
          <Button variant="outline" size="md">Apply</Button>
        </div>
      </div>

      {/* Summary Lines */}
      <div className="space-y-3 pb-6 border-b border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="text-gray-900">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Shipping</span>
          <span className={shipping === 0 ? 'text-green-600 font-medium' : 'text-gray-900'}>
            {shipping === 0 ? 'Free' : formatCurrency(shipping)}
          </span>
        </div>
        {subtotal > 0 && subtotal <= 100 && (
          <p className="text-xs text-purple-600">
            Add {formatCurrency(100 - subtotal)} more for free shipping!
          </p>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between py-6">
        <span className="text-lg font-semibold text-gray-900">Total</span>
        <span className="text-lg font-semibold text-gray-900">{formatCurrency(total)}</span>
      </div>

      {/* Checkout Button */}
      {cartEmpty ? (
        <Button className="w-full gap-2" size="lg" disabled>
          Proceed to Checkout
          <ArrowRight className="w-5 h-5" />
        </Button>
      ) : (
        <Link href="/checkout">
          <Button className="w-full gap-2" size="lg">
            Proceed to Checkout
            <ArrowRight className="w-5 h-5" />
          </Button>
        </Link>
      )}

      {/* Security Note */}
      <p className="text-xs text-gray-500 text-center mt-4">
        Secure checkout powered by Stripe
      </p>
    </div>
  )
}

export default function Cart() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart, subtotal, shipping, total } = useCart()
  const { addToast } = useToast()

  const handleRemove = (item) => {
    removeFromCart(item.cartItemId)
    addToast(`${item.name} removed from cart.`, 'info')
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
          <Link href="/shop">
            <Button size="lg" className="gap-2">
              Continue Shopping
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
        <p className="text-gray-500">
          {cart.reduce((sum, i) => sum + i.quantity, 0)} items in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[14px] border border-gray-200 p-6">
            {cart.map((item) => (
              <CartItem
                key={item.cartItemId}
                item={item}
                onIncrease={() => increaseQuantity(item.cartItemId)}
                onDecrease={() => decreaseQuantity(item.cartItemId)}
                onRemove={() => handleRemove(item)}
              />
            ))}
          </div>

          {/* Continue Shopping */}
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 mt-6 text-sm font-medium text-purple-600 hover:text-purple-700"
          >
            <ArrowRight className="w-4 h-4 rotate-180" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <OrderSummary
          subtotal={subtotal}
          shipping={shipping}
          total={total}
          cartEmpty={cart.length === 0}
        />
      </div>
    </div>
  )
}
