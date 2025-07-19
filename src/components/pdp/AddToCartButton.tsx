import React from 'react'


interface Props {
  skuId: string
}

const AddToCartButton: React.FC<Props> = ({ skuId }) => {
  const handleClick = () => {
    const url = `https://cuerosvelezco.myvtex.com/checkout/cart/add?sku=${skuId}&qty=1&seller=1&sc=1`
    window.open(url, '_blank')
  }

  return (
    <button onClick={handleClick}>
      Agregar al carrito
    </button>
  )
}

export default AddToCartButton
