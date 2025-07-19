// src/components/pdp/CartIcon.tsx
import React, { useState } from 'react'
import { useCart } from './CartContext'
import styles from './PDP.module.css'

const CartIcon: React.FC = () => {
  const { cart, removeFromCart, getCartTotal } = useCart()
  const [showDropdown, setShowDropdown] = useState(false)

  const toggleDropdown = () => setShowDropdown(!showDropdown)

  return (
    <div className={styles.cartContainer}>
      <button onClick={toggleDropdown} className={styles.cartButton}>
        🛒 ({cart.length})
      </button>

      {showDropdown && (
        <div className={styles.cartDropdown}>
          {cart.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <>
              {cart.map((item, index) => (
                <div key={index} className={styles.cartItem}>
                  <img
                    src={item.image}
                    alt={item.title}
                    className={styles.cartItemImage}
                  />
                  <div className={styles.cartItemDetails}>
                    <strong>{item.title}</strong>
                    <p>Precio: ${item.price.toFixed(2)}</p>
                    <p>Talla: {item.selectedSize}</p>
                    <p>Color: {item.selectedColor}</p>
                    <p>Cantidad: {item.quantity}</p>
                    <button
                      className={styles.cartRemove}
                      onClick={() => removeFromCart(item.skuId)}
                    >
                      X Quitar
                    </button>
                  </div>
                </div>
              ))}

              <hr />
              <p className={styles.cartTotal}>
                Total: <strong>${getCartTotal().toFixed(2)}</strong>
              </p>
              <button className={styles.cartCheckout}>Finalizar compra</button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default CartIcon
