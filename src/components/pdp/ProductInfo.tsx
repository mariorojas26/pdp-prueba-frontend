import React from 'react'
import styles from './PDP.module.css'

interface Props {
  title: string
  brand: string
  reference: string
  price: number
  listPrice: number
}

const ProductInfo: React.FC<Props> = ({ title, brand, reference, price, listPrice }) => {
  const discount = listPrice > price
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : 0

  return (
    <div className={styles.productInfoContainer}>
      {/* Bloque de titulo */}
      <h1 className={styles.productTitle}>{title}</h1>

      {/* Meta info en línea */}
      <p className={styles.productMeta}>
        {brand} · SKU {reference}
      </p>

      {/* Bloque de precios */}
      <div className={styles.priceBox}>
        <div className={styles.priceBox1}>
          <p className={styles.currentPrice}>
            ${price.toLocaleString('es-CO')}
          </p>
          <p className={styles.discount}>
            {discount}% OFF
          </p>
        </div>

        <div className={styles.priceBox2}>
          <p className={styles.oldPrice}>
            ${listPrice.toLocaleString('es-CO')}
          </p>
        </div>  
      </div>
    </div>
  )
}

export default ProductInfo
