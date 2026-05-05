// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('cart')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  // Generate composite key
  const makeCartItemId = (id, selectedColor, selectedSize) =>
    `${id}-${selectedColor}-${selectedSize}`

  const addToCart = useCallback(({ id, name, price, image, selectedColor, selectedSize, quantity = 1 }) => {
    const cartItemId = makeCartItemId(id, selectedColor, selectedSize)
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.cartItemId === cartItemId)
      if (existingIndex !== -1) {
        const updated = [...prev]
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        }
        return updated
      }
      return [
        ...prev,
        { cartItemId, id, name, price, image, selectedColor, selectedSize, quantity },
      ]
    })
  }, [])

  const increaseQuantity = useCallback((cartItemId) => {
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    )
  }, [])

  const decreaseQuantity = useCallback((cartItemId) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.cartItemId === cartItemId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    )
  }, [])

  const removeFromCart = useCallback((cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId))
  }, [])

  const clearCart = useCallback(() => setCart([]), [])

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : subtotal === 0 ? 0 : 9.99
  const total = subtotal + shipping
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
        clearCart,
        subtotal,
        shipping,
        total,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}