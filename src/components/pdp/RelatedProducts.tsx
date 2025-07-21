import React, { useEffect, useState } from 'react'
import styles from './PDP.module.css'

interface Product {
  productId: string
  title: string
  price: number
  image: string
}

const RelatedProducts: React.FC = () => {
  const [related, setRelated] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [index, setIndex] = useState(0)
  const [fade, setFade] = useState(false)

  // Preload de imágenes
  const preloadImages = (urls: string[]) => {
    urls.forEach(url => {
      const img = new Image()
      img.src = url
    })
  }

  useEffect(() => {
    fetch('https://api-frontend-production.up.railway.app/api/products?ft=tenis')
      .then(res => res.json())
      .then(data => {
        const products: Product[] = data.slice(0, 10).map((p: any) => ({
          productId: p.productId,
          title: p.productName,
          price: p.items?.[0]?.sellers?.[0]?.commertialOffer?.Price ?? 0,
          image: p.items?.[0]?.images?.[0]?.imageUrl ?? 'https://via.placeholder.com/150'
        }))
        preloadImages(products.map(p => p.image))
        setRelated(products)
      })
      .catch(error => {
        console.error('Error cargando productos relacionados:', error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  const itemsPerView = typeof window !== 'undefined' && window.innerWidth < 768 ? 2 : 3

  const handleChange = (direction: 'next' | 'prev') => {
    setFade(true)
    setTimeout(() => {
      setIndex(prev =>
        direction === 'next'
          ? (prev + itemsPerView) % related.length
          : (prev - itemsPerView + related.length) % related.length
      )
      setFade(false)
    }, 150)
  }

  if (loading) return <p>Cargando productos relacionados...</p>
  if (!related.length) return <p>No se encontraron productos relacionados.</p>

  const visibleItems = [...related, ...related].slice(index, index + itemsPerView)

  return (
    <div className={styles.relatedWrapper}>
      <h3 className={styles.relatedTitle}>También te puede interesar</h3>
      <div className={styles.carouselControls}>
        <button onClick={() => handleChange('prev')} className={styles.carouselButton}>{'<'}</button>
        <div className={`${styles.relatedGrid} ${fade ? styles.fadeOut : styles.fadeIn}`}>
          {visibleItems.map(product => (
            <div key={product.productId} className={styles.relatedCard}>
              <img src={product.image} alt={product.title} className={styles.relatedImage} />
              <div className={styles.relatedInfo}>
                <p className={styles.relatedName}>{product.title}</p>
                <p className={styles.relatedPrice}>${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <button onClick={() => handleChange('next')} className={styles.carouselButton}>{'>'}</button>
      </div>
    </div>
  )
}

export default RelatedProducts
