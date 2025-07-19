import React from 'react'
import styles from './PDP.module.css'

interface Props {
  images: { imageUrl: string }[]
  productName: string
}

const ImageGallery: React.FC<Props> = ({ images, productName }) => {
  return (
    <div className={styles.imageScrollContainer}>
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
