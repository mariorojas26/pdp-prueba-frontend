// src/components/pdp/SizeSelector.tsx
import React, { useState } from 'react'
import styles from './PDP.module.css'

interface Props {
  sizes: string[]
  onSelectSize: (size: string) => void
}

const SizeSelector: React.FC<Props> = ({ sizes, onSelectSize }) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)

  const handleSelect = (size: string) => {
    setSelectedSize(size)
    onSelectSize(size)
  }

  return (
    <div>
      <h4>Tallas disponibles</h4>
      <div>
        {sizes.map((size, index) => (
          <button
            key={index}
            className={`${styles.buttonsize} ${selectedSize === size ? styles.buttonActive : ''}`}
            onClick={() => handleSelect(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SizeSelector
