import React from 'react'
import styles from './PDP.module.css'

interface Props {
  quantity: number
  onChange: (newQuantity: number) => void
}

const QuantitySelector: React.FC<Props> = ({ quantity, onChange }) => {
  const handleDecrease = () => {
    if (quantity > 1) {
      onChange(quantity - 1)
    }
  }

  const handleIncrease = () => {
    onChange(quantity + 1)
  }

  return (
  <div className={styles.quantityWrapper}>
  <h4>Cantidad</h4>
  <div className={styles.counterRow}>
    <button onClick={handleDecrease} className={styles.quantityButtonLeft}>-</button>
    <button className={styles.quantityButtonNumber}>{quantity}</button> 
    <button onClick={handleIncrease} className={styles.quantityButtonRight}>+</button>
  </div>
</div>
  )
}

export default QuantitySelector
