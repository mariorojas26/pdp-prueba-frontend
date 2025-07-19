import React from 'react'

interface Props {
  colors: string[]
}

const ColorSelector: React.FC<Props> = ({ colors }) => {
  return (
    <div>
      <h4>Colores disponibles</h4>
      <div>
        {colors.map((color, index) => (
          <button key={index}>{color}</button>
        ))}
      </div>
    </div>
  )
}

export default ColorSelector
