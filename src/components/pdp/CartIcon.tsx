import React, { useState } from 'react'
import { useCart } from './CartContext'
import styles from './PDP.module.css'

const CartIcon: React.FC = () => {
  const { cart, removeFromCart, getCartTotal } = useCart()
  const [open, setOpen] = useState(false)

  const toggleDropdown = () => setOpen(!open)

  return (
    <div className={styles.cartContainer}>
      {/* Ícono con contador */}
      <button className={styles.cartButton} onClick={toggleDropdown}>
        🛒
        {cart.length > 0 && <span className={styles.cartCount}>{cart.length}</span>}
      </button>

      {/* Dropdown */}
      {open && (
        <div className={styles.cartDropdown}>
          <h4>Tu carrito</h4>
          {cart.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <>
              <ul className={styles.cartList}>
                {cart.map((item) => (
                  <li key={item.skuId} className={styles.cartItem}>
                    <img src={item.image} alt={item.title} className={styles.cartImage} />
                    <div>
                      <p>{item.title}</p>
                      <p>${item.price.toLocaleString()}</p>
                      <button onClick={() => removeFromCart(item.skuId)}>Eliminar</button>
                    </div>
                  </li>
                ))}
              </ul>
              <p className={styles.cartTotal}>Total: ${getCartTotal().toLocaleString()}</p>
              <button className={styles.checkoutButton}>Finalizar Compra</button>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default CartIcon
