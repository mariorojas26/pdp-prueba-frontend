// src/pages/ProductPage.tsx
import React, { useEffect, useState } from 'react'
import PDP from '../components/pdp/PDP'

const ProductPage: React.FC = () => {
  const [product, setProduct] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch('https://api-frontend-production.up.railway.app/api/products/125829257')
        if (!res.ok) throw new Error('Error al cargar producto')
        const data = await res.json()
        setProduct(data[0])
      } catch (err) {
        setError(true)
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [])

  if (loading) return <p>Cargando producto...</p>
  if (error || !product) return <p>Error al cargar producto.</p>

  return <PDP product={product} />
}

export default ProductPage
