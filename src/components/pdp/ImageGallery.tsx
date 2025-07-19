import React from 'react'
import styles from './PDP.module.css'

interface Props {
  images: { imageUrl: string }[]
  productName: string
}

const ImageGallery: React.FC<Props> = ({ images, productName }) => {
  return (
    <div className={styles.galleryWrapper}>
      {images.map((img, i) => (
        <img
          key={i}
          src={img.imageUrl}
          width={100}
          className={styles.galleryImage}
          alt={`${productName} ${i + 1}`}
        />
      ))}
    </div>
  )
}

export default ImageGallery
