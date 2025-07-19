import React from 'react'


interface Props {
  title: string
  brand: string
  description: string
  reference: string
  color: string
}

const ProductInfo: React.FC<Props> = ({ title, brand, description, reference, color }) => {
  return (
    <div>
      <h1>{title}</h1>
      <p><strong>Marca:</strong> {brand}</p>
      <p><strong>Referencia:</strong> {reference}</p>
      <p><strong>Color:</strong> {color}</p>
      <p><strong>Descripción:</strong> {description}</p>
    </div>
  )
}

export default ProductInfo
