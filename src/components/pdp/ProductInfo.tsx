import React from 'react'
import styles from './PDP.module.css'


interface Props {
  title: string
  brand: string
  reference: string
}

const ProductInfo: React.FC<Props> = ({ title, brand, reference, }) => {
  return (
<div className={styles.productInfoContainer}>
  <h1 className={styles.productTitle}>{title}</h1>
  <p className={styles.productBrand}>
    <strong>Marca:</strong> {brand}
  </p>
  <p className={styles.productReference}>
    <strong>Referencia:</strong> {reference}
  </p>
</div>

  )
}

export default ProductInfo
