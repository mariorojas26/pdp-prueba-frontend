// src/components/pdp/CartContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react'

export interface CartItem {
  skuId: string
  title: string
  price: number
  image: string
  quantity: number  // ⬅️ Agregado para permitir manejar cantidades
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (skuId: string) => void
  getCartTotal: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
  const storedCart = localStorage.getItem('cart')
  return storedCart ? JSON.parse(storedCart) : []
})


  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  // Guardar carrito cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (item: CartItem) => {
    setCart((prev) => [...prev, item])
  }

  const removeFromCart = (skuId: string) => {
    setCart((prev) => prev.filter((item) => item.skuId !== skuId))
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + item.price, 0)
  }

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
