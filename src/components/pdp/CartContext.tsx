// src/components/pdp/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  skuId: string
  title: string
  price: number
  image: string
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (skuId: string, size?: string, color?: string) => void
  getCartTotal: () => number
  showCart: boolean
  toggleCart: () => void
  openCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isInitialized, setIsInitialized] = useState(false)
  const [showCart, setShowCart] = useState(false)

  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      try {
        const parsed = JSON.parse(storedCart)
        if (Array.isArray(parsed)) {
          setCart(parsed)
        }
      } catch (err) {
        console.error('Error al leer el carrito del localStorage:', err)
      }
    }
    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, isInitialized])

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existingIndex = prev.findIndex(p =>
        p.skuId === item.skuId &&
        p.selectedSize === item.selectedSize &&
        p.selectedColor === item.selectedColor
      )

      if (existingIndex !== -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += item.quantity
        return updated
      }

      return [...prev, item]
    })
  }

  const removeFromCart = (skuId: string, size?: string, color?: string) => {
    setCart(prev =>
      prev.filter(item =>
        !(item.skuId === skuId &&
          item.selectedSize === size &&
          item.selectedColor === color)
      )
    )
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const toggleCart = () => setShowCart(prev => !prev)
  const openCart = () => setShowCart(true)

  if (!isInitialized) return null

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartTotal, showCart, toggleCart, openCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = (): CartContextType => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }
  return context
}
