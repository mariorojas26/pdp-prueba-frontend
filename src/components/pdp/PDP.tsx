import React from 'react'
import styles from './PDP.module.css'
import ImageGallery from './ImageGallery'
import ProductInfo from './ProductInfo'
import AddToCartButton from './AddToCartButton'
import SizeSelector from './SizeSelector'
import ColorSelector from './ColorSelector'
import ProductDetails from './ProductDetails'

interface Props {
  product: any 
}

const PDP: React.FC<Props> = ({ product }) => {
  return (
  <div className={styles.pdpWrapper}>
    {/*COLUMNA 1: Galería de Imágenes */}
    <div className={styles.pdpGallery}>
      <ImageGallery
       images={product.items[0].images} 
       productName={product.productName}
       />
    </div>

    {/* COLUMNA 2: Información del Producto */}
    <div className={styles.pdpInfo}>
      
      {/* Título, Marca, Descripción, Referencia, Color */}
      <ProductInfo
        title={product.productName}
        price={product.items[0].sellers[0].commertialOffer.Price}
        listPrice={product.items[0].sellers[0].commertialOffer.ListPrice}     
        brand={product.brand}
        reference={product.items?.[0]?.referenceId?.[0]?.Value || 'Sin referencia'}
      />

      <ProductDetails
        description={product.description}
        caracteristicas={product['CARACTERÍSTICAS'] || []}
        composicion={product['COMPOSICIÓN'] || []}
      />

      {/*Tallas disponibles */}
      <SizeSelector
        sizes={Array.from(
          new Set(
            product.items
              .map((item: any) => item.Talla?.[0] || null)
              .filter((size: string | null): size is string => size !== null)
          )
        )}
      />

      {/* Colores disponibles */}
      <ColorSelector
        colors={Array.from(
          new Set(
            product.items
              .map((item: any) => item.Color?.[0] || null)
              .filter((color: string | null): color is string => color !== null)
          )
        )}
      />

      {/*Botón de agregar al carrito */}
      <AddToCartButton skuId={product.items[0].itemId} />
    </div>
  </div>
)

}

export default PDP
