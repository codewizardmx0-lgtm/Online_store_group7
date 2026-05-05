// src/context/WishlistContext.jsx
import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const WishlistContext = createContext()

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('wishlist')
      return stored ? JSON.parse(stored) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  const isWishlisted = useCallback(
    (productId) => wishlist.some((item) => item.id === productId),
    [wishlist]
  )

  const toggleWishlist = useCallback((product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id)
      if (exists) return prev.filter((item) => item.id !== product.id)
      return [...prev, { id: product.id, name: product.name, price: product.price, image: product.image, category: product.category, rating: product.rating }]
    })
  }, [])

  const removeFromWishlist = useCallback((productId) => {
    setWishlist((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const clearWishlist = useCallback(() => setWishlist([]), [])

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        isWishlisted,
        toggleWishlist,
        removeFromWishlist,
        clearWishlist,
        totalWishlistItems: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider')
  return ctx
}
