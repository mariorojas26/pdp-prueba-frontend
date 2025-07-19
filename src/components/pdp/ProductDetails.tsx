import React, { useState } from 'react'
import styles from './PDP.module.css'

interface Props {
  description: string
  caracteristicas: string[]
  composicion: string[]
}

const ProductDetails: React.FC<Props> = ({ description, caracteristicas, composicion }) => {
  const [openTab, setOpenTab] = useState<'desc' | 'carac' | 'comp'>('desc')

  return (
    <div>
      <div className={styles.tabContainer}>
        <button
          onClick={() => setOpenTab('desc')}
          className={`${styles.tabButton} ${openTab === 'desc' ? styles.tabButtonActive : ''}`}
        >
          Descripción
        </button>
        <button
          onClick={() => setOpenTab('carac')}
          className={`${styles.tabButton} ${openTab === 'carac' ? styles.tabButtonActive : ''}`}
        >
          Detalles
        </button>
        <button
          onClick={() => setOpenTab('comp')}
          className={`${styles.tabButton} ${openTab === 'comp' ? styles.tabButtonActive : ''}`}
        >
          Materiales
        </button>
      </div>

      {/* DESCRIPCIÓN */}
      <div className={`${styles.tabContent} ${openTab === 'desc' ? styles.tabContentVisible : ''}`}>
        <p>{description}</p>
      </div>

      {/* DETALLES */}
      <div className={`${styles.tabContent} ${openTab === 'carac' ? styles.tabContentVisible : ''}`}>
        <ul>
          {caracteristicas.map((item, idx) => (
            <li className={styles.espaciotext} key={idx} dangerouslySetInnerHTML={{ __html: item }} />
          ))}
        </ul>
      </div>

      {/* MATERIALES */}
      <div className={`${styles.tabContent} ${openTab === 'comp' ? styles.tabContentVisible : ''}`}>
        <ul className={styles.materialList}>
          {composicion[0]
            .split('|')
            .map((item, idx) => (
              <li className={styles.espaciotext} key={idx}>- {item.trim()}</li>
            ))}
        </ul>
      </div>

      
    </div>
  )
}

export default ProductDetails
