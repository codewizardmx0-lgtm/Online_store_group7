// src/pages/Checkout.jsx
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CreditCard, Truck, ChevronLeft, Check, Lock } from 'lucide-react'
import { products } from '@/lib/mockData'
import { cn, formatCurrency } from '@/lib/utils'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'

// Mock order items
const orderItems = [
  { product: products[0], quantity: 2, color: 'White', size: '9' },
  { product: products[1], quantity: 1, color: 'Silver', size: 'One Size' },
]

const paymentMethods = [
  { id: 'card', name: 'Credit Card', icon: CreditCard },
  { id: 'paypal', name: 'PayPal', icon: null, logo: 'PayPal' },
]

export default function Checkout() {
  const [step, setStep] = useState(1)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: '',
    cardName: '',
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const subtotal = orderItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const shipping = 0
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link 
            to="/cart" 
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-4"
          >
            <ChevronLeft className="w-4 h-4" />
            Back to Cart
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center gap-4 mb-8">
          {['Shipping', 'Payment', 'Review'].map((s, idx) => (
            <div key={s} className="flex items-center gap-2">
              <div className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                step > idx + 1 ? 'bg-green-500 text-white' :
                step === idx + 1 ? 'bg-purple-600 text-white' :
                'bg-gray-200 text-gray-500'
              )}>
                {step > idx + 1 ? <Check className="w-4 h-4" /> : idx + 1}
              </div>
              <span className={cn(
                'text-sm font-medium hidden sm:inline',
                step === idx + 1 ? 'text-gray-900' : 'text-gray-500'
              )}>
                {s}
              </span>
              {idx < 2 && <div className="w-8 sm:w-16 h-0.5 bg-gray-200 mx-2" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-[14px] border border-gray-200 p-6 sm:p-8">
              {/* Step 1: Shipping */}
              {step === 1 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Shipping Information</h2>
                  
                  <div className="space-y-4">
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                    />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        name="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                      <Input
                        label="Last Name"
                        name="lastName"
                        placeholder="Doe"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>

                    <Input
                      label="Address"
                      name="address"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={handleChange}
                    />

                    <Input
                      label="Apartment, suite, etc. (optional)"
                      name="apartment"
                      placeholder="Apt 4B"
                      value={formData.apartment}
                      onChange={handleChange}
                    />

                    <div className="grid sm:grid-cols-3 gap-4">
                      <Input
                        label="City"
                        name="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={handleChange}
                      />
                      <Input
                        label="State"
                        name="state"
                        placeholder="NY"
                        value={formData.state}
                        onChange={handleChange}
                      />
                      <Input
                        label="ZIP Code"
                        name="zipCode"
                        placeholder="10001"
                        value={formData.zipCode}
                        onChange={handleChange}
                      />
                    </div>

                    <Input
                      label="Phone Number"
                      name="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <Button 
                    className="w-full mt-8" 
                    size="lg"
                    onClick={() => setStep(2)}
                  >
                    Continue to Payment
                  </Button>
                </div>
              )}

              {/* Step 2: Payment */}
              {step === 2 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Payment Method</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="space-y-3 mb-6">
                    {paymentMethods.map((method) => (
                      <label
                        key={method.id}
                        className={cn(
                          'flex items-center gap-4 p-4 rounded-[10px] border cursor-pointer transition-all',
                          paymentMethod === method.id
                            ? 'border-purple-600 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        )}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                        />
                        {method.icon && <method.icon className="w-5 h-5 text-gray-600" />}
                        {method.logo && <span className="text-blue-600 font-bold">{method.logo}</span>}
                        <span className="font-medium text-gray-900">{method.name}</span>
                      </label>
                    ))}
                  </div>

                  {/* Card Details */}
                  {paymentMethod === 'card' && (
                    <div className="space-y-4 pt-4 border-t border-gray-200">
                      <Input
                        label="Card Number"
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleChange}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          label="Expiry Date"
                          name="cardExpiry"
                          placeholder="MM / YY"
                          value={formData.cardExpiry}
                          onChange={handleChange}
                        />
                        <Input
                          label="CVC"
                          name="cardCvc"
                          placeholder="123"
                          value={formData.cardCvc}
                          onChange={handleChange}
                        />
                      </div>

                      <Input
                        label="Name on Card"
                        name="cardName"
                        placeholder="John Doe"
                        value={formData.cardName}
                        onChange={handleChange}
                      />
                    </div>
                  )}

                  <div className="flex gap-4 mt-8">
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </Button>
                    <Button 
                      className="flex-1" 
                      size="lg"
                      onClick={() => setStep(3)}
                    >
                      Review Order
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Review */}
              {step === 3 && (
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-6">Review Your Order</h2>
                  
                  {/* Shipping Address */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-[10px]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Truck className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-900">Shipping Address</span>
                      </div>
                      <button 
                        onClick={() => setStep(1)}
                        className="text-sm text-purple-600 hover:text-purple-700"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {formData.firstName || 'John'} {formData.lastName || 'Doe'}<br />
                      {formData.address || '123 Main Street'}<br />
                      {formData.city || 'New York'}, {formData.state || 'NY'} {formData.zipCode || '10001'}
                    </p>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-[10px]">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-900">Payment Method</span>
                      </div>
                      <button 
                        onClick={() => setStep(2)}
                        className="text-sm text-purple-600 hover:text-purple-700"
                      >
                        Edit
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">
                      {paymentMethod === 'card' ? `Card ending in ${formData.cardNumber.slice(-4) || '4242'}` : 'PayPal'}
                    </p>
                  </div>

                  {/* Order Items */}
                  <div className="mb-6">
                    <h3 className="font-medium text-gray-900 mb-4">Order Items</h3>
                    <div className="space-y-4">
                      {orderItems.map((item) => (
                        <div key={item.product.id} className="flex gap-4">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-16 h-16 object-cover rounded-[6px]"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-gray-900">{item.product.name}</p>
                            <p className="text-sm text-gray-500">
                              {item.color} / {item.size} × {item.quantity}
                            </p>
                          </div>
                          <span className="font-medium text-gray-900">
                            {formatCurrency(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-8">
                    <Button 
                      variant="outline" 
                      size="lg"
                      onClick={() => setStep(2)}
                    >
                      Back
                    </Button>
                    <Button 
                      className="flex-1 gap-2" 
                      size="lg"
                    >
                      <Lock className="w-4 h-4" />
                      Place Order - {formatCurrency(total)}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-[14px] border border-gray-200 p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Order Summary</h3>
              
              {/* Items */}
              <div className="space-y-4 pb-6 border-b border-gray-200">
                {orderItems.map((item) => (
                  <div key={item.product.id} className="flex gap-3">
                    <div className="relative">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-14 h-14 object-cover rounded-[6px]"
                      />
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-500 text-white text-xs rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                      <p className="text-xs text-gray-500">{item.color} / {item.size}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="space-y-3 py-6 border-b border-gray-200">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="text-gray-900">{formatCurrency(tax)}</span>
                </div>
              </div>

              <div className="flex justify-between py-6">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-lg font-semibold text-gray-900">{formatCurrency(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
