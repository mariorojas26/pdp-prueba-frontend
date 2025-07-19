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
}

const AddToCartButton: React.FC<Props> = ({
  skuId,
  title,
  price,
  image,
  selectedSize,
  selectedColor,
  quantity
}) => {
  const { addToCart } = useCart()

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
  }

  return (
    <button className={styles.buttonAddToCart} onClick={handleClick}>
      Agregar al carrito
    </button>
  )
}

export default AddToCartButton
