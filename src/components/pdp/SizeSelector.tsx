import React from 'react'
import styles from './PDP.module.css'


interface Props {
  sizes: string[]
}

const SizeSelector: React.FC<Props> = ({ sizes }) => {
  return (
    <div>
      <h4>Tallas disponibles</h4>
      <div>
        {sizes.map((size, index) => (
          <button className={styles.buttonsize} key={index}>{size}</button>
        ))}
      </div>
    </div>
  )
}

export default SizeSelector
