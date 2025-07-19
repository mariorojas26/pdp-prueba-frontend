import React from 'react'
import styles from './PDP.module.css'

import { useCart } from './CartContext'
import type { CartItem } from './CartContext'


interface Props {
  skuId: string
  title: string
  price: number
  image: string
}

const AddToCartButton: React.FC<Props> = ({ skuId, title, price, image }) => {
  const { addToCart } = useCart()

  const handleClick = () => {
    const newItem: CartItem = {
      skuId,
      title,
      price,
      image,
      quantity: 1
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
