import React, { useEffect, useRef, useState } from 'react'
import styles from './PDP.module.css'

interface Props {
  images: { imageUrl: string }[]
  productName: string
}

const ImageGallery: React.FC<Props> = ({ images, productName }) => {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollRef.current
    const isDesktop = window.innerWidth > 767
    if (!container || !isDesktop) return

    let interacted = false

    const stopAnimation = () => {
      interacted = true
    }

    container.addEventListener('wheel', stopAnimation, { passive: true })
    container.addEventListener('touchmove', stopAnimation, { passive: true })

    const animateScroll = (
      direction: 'down' | 'up',
      distance: number,
      duration: number,
      callback?: () => void
    ) => {
      const start = container.scrollTop
      const end = direction === 'down' ? start + distance : start - distance
      const startTime = performance.now()

      const step = (currentTime: number) => {
        if (interacted) return

        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / duration, 1)
        const ease = 0.5 - 0.5 * Math.cos(Math.PI * progress)
        container.scrollTop = start + (end - start) * ease

        if (progress < 1) {
          requestAnimationFrame(step)
        } else if (callback) {
          callback()
        }
      }

      requestAnimationFrame(step)
    }

    const timer = setTimeout(() => {
      if (interacted) return
      animateScroll('down', 80, 900, () => {
        animateScroll('up', 80, 900)
      })
    }, 1000)

    return () => {
      clearTimeout(timer)
      container.removeEventListener('wheel', stopAnimation)
      container.removeEventListener('touchmove', stopAnimation)
    }
  }, [])

  return (
    <div className={styles.imageScrollContainer} ref={scrollRef}>
      {images.map((img, i) => (
        <img
          key={i}
          src={img.imageUrl}
          className={styles.galleryImage}
          alt={`${productName} ${i + 1}`}
          width={100}
        />
      ))}
    </div>
  )
}

export default ImageGallery
