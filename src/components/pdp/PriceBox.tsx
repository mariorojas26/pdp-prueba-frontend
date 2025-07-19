import React from 'react'
import styles from './PDP.module.css'

interface Props {
  listPrice: number
  price: number
}

const PriceBox: React.FC<Props> = ({ listPrice, price }) => {
  const discount = listPrice && price
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : 0

  return (
    <div className={styles.priceBox}>
      <p className={styles.priceBox__oldPrice}>
        <strong>Precio anterior:</strong> ${listPrice.toFixed(2)}
      </p>
      <p className={styles.priceBox__currentPrice}>
        <strong>Precio actual:</strong> ${price.toFixed(2)}
      </p>
      <p className={styles.priceBox__discount}>
        <strong>Descuento:</strong> {discount}% OFF
      </p>
    </div>
  )
}

export default PriceBox
