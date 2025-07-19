// src/components/pdp/AddToCartButton.tsx
import React from 'react'
import styles from './PDP.module.css'
import { useCart } from './CartContext'
import type { CartItem } from './CartContext'

interface Props {
  skuId: string
  title: string
  price: number
  image: string
  selectedSize: string | null
  selectedColor: string | null
  quantity: number
  onAdded?: () => void // 🔧 Nuevo callback opcional
}

const AddToCartButton: React.FC<Props> = ({
  skuId,
  title,
  price,
  image,
  selectedSize,
  selectedColor,
  quantity,
  onAdded
}) => {
  const { addToCart, openCart } = useCart() // ✅ openCart para abrir el carrito

  const handleClick = () => {
    const newItem: CartItem = {
      skuId,
      title,
      price,
      image,
      quantity,
      selectedSize: selectedSize || 'No definida',
      selectedColor: selectedColor || 'No definido'
    }

    addToCart(newItem)
    openCart()       // ✅ Abre el carrito al agregar
    onAdded?.()      // ✅ Llama al callback si existe
  }

  return (
    <button className={styles.buttonAddToCart} onClick={handleClick}>
      Agregar al carrito
    </button>
  )
}

export default AddToCartButton
