import React from 'react'

interface Props {
  sizes: string[]
}

const SizeSelector: React.FC<Props> = ({ sizes }) => {
  return (
    <div>
      <h4>Tallas disponibles</h4>
      <div>
        {sizes.map((size, index) => (
          <button key={index}>{size}</button>
        ))}
      </div>
    </div>
  )
}

export default SizeSelector
