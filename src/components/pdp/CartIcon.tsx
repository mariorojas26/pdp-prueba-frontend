// src/components/pdp/CartIcon.tsx
import React from 'react'
import { useCart } from './CartContext'
import styles from './PDP.module.css'

const CartIcon: React.FC = () => {
  const { cart, removeFromCart, getCartTotal, showCart, toggleCart } = useCart()

  return (
    <div className={styles.cartContainer}>
      <button onClick={toggleCart} className={styles.cartButton}>
        🛒 ({cart.length})
      </button>

      {showCart && (
        <>
          <div className={styles.cartOverlay} onClick={toggleCart} />
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
                      <p className={styles.cartItemText}>Precio: ${item.price.toFixed(2)}</p>
                      <p className={styles.cartItemText}>Talla: {item.selectedSize}</p>
                      <p className={styles.cartItemText}>Color: {item.selectedColor}</p>
                      <p className={styles.cartItemText}>Cantidad: {item.quantity}</p>
                      <button
                        className={styles.cartRemove}
                        onClick={() =>
                          removeFromCart(item.skuId, item.selectedSize, item.selectedColor)
                        }
                      >
                        X Quitar
                      </button>
                    </div>
                  </div>
                ))}
                <p className={styles.cartTotal}>
                  Total: <strong>${getCartTotal().toFixed(2)}</strong>
                </p>
                <button className={styles.cartCheckout}>Finalizar compra</button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  )
}

export default CartIcon
