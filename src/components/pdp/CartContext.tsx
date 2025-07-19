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
  removeFromCart: (skuId: string) => void
  getCartTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isReady, setIsReady] = useState(false)

  // Leer carrito desde localStorage al montar
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
    setIsReady(true)
  }, [])

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (isReady) {
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart, isReady])

  // Agregar producto, evitando duplicados
  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(p => p.skuId === item.skuId)
      if (existing) {
        return prev.map(p =>
          p.skuId === item.skuId
            ? { ...p, quantity: p.quantity + item.quantity }
            : p
        )
      }
      return [...prev, item]
    })
  }

  const removeFromCart = (skuId: string) => {
    setCart(prev => prev.filter(item => item.skuId !== skuId))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  if (!isReady) return null // Evita exponer datos antes de cargar

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartTotal }}>
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
