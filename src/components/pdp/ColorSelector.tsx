// src/components/pdp/ColorSelector.tsx
import React, { useState } from 'react'
import styles from './PDP.module.css'

interface Props {
  colors: string[]
  onSelectColor: (color: string) => void
}

const ColorSelector: React.FC<Props> = ({ colors, onSelectColor }) => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)

  const handleSelect = (color: string) => {
    setSelectedColor(color)
    onSelectColor(color)
  }

  return (
    <div>
      <h4>Colores disponibles</h4>
      <div>
        {colors.map((color, index) => (
          <button
            key={index}
            className={`${styles.buttoncolor} ${selectedColor === color ? styles.buttonActive : ''}`}
            onClick={() => handleSelect(color)}
          >
            {color}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ColorSelector
