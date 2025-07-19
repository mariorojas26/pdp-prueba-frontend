// src/components/pdp/PDP.tsx
import React, { useState, useEffect } from 'react'
import styles from './PDP.module.css'
import ImageGallery from './ImageGallery'
import ProductInfo from './ProductInfo'
import AddToCartButton from './AddToCartButton'
import SizeSelector from './SizeSelector'
import ColorSelector from './ColorSelector'
import ProductDetails from './ProductDetails'
import QuantitySelector from './QuantitySelector'

interface Props {
  product: any
}

const PDP: React.FC<Props> = ({ product }) => {
  const sizes: string[] = Array.from(
    new Set(
      product.items
        .map((item: any) => item.Talla?.[0] || null)
        .filter((size: string | null): size is string => size !== null)
    )
  )

  const colors: string[] = Array.from(
    new Set(
      product.items
        .map((item: any) => item.Color?.[0] || null)
        .filter((color: string | null): color is string => color !== null)
    )
  )

  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

  // Seleccionar primera talla por defecto si no hay selección
  useEffect(() => {
    if (!selectedSize && sizes.length > 0) {
      setSelectedSize(sizes[0])
    }
  }, [sizes, selectedSize])

  // Seleccionar primer color por defecto si no hay selección
  useEffect(() => {
    if (!selectedColor && colors.length > 0) {
      setSelectedColor(colors[0])
    }
  }, [colors, selectedColor])

  return (
    <div className={styles.pdpWrapper}>
      {/* COLUMNA 1: Galería de Imágenes */}
      <div className={styles.pdpGallery}>
        <ImageGallery
          images={product.items[0].images}
          productName={product.productName}
        />
      </div>

      {/* COLUMNA 2: Información del Producto */}
      <div className={styles.pdpInfo}>
        <ProductInfo
          title={product.productName}
          price={product.items[0].sellers[0].commertialOffer.Price}
          listPrice={product.items[0].sellers[0].commertialOffer.ListPrice}
          brand={product.brand}
          reference={
            product.items?.[0]?.referenceId?.[0]?.Value || 'Sin referencia'
          }
        />

        <ProductDetails
          description={product.description}
          caracteristicas={product['CARACTERÍSTICAS'] || []}
          composicion={product['COMPOSICIÓN'] || []}
        />

        <QuantitySelector quantity={quantity} onChange={setQuantity} />

        <AddToCartButton
          skuId={product.items[0].itemId}
          title={product.productName}
          price={product.items[0].sellers[0].commertialOffer.Price}
          image={product.items[0].images[0].imageUrl}
          selectedSize={selectedSize}
          selectedColor={selectedColor}
          quantity={quantity}
          onAdded={() => setQuantity(1)} // ✅ Resetea la cantidad después de agregar
        />

        <SizeSelector sizes={sizes} onSelectSize={setSelectedSize} />
        <ColorSelector colors={colors} onSelectColor={setSelectedColor} />
      </div>
    </div>
  )
}

export default PDP
