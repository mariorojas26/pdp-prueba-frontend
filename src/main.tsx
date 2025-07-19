import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 👉 Importa el contexto del carrito
import { CartProvider } from './components/pdp/CartContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider> 
      <App />
    </CartProvider>
  </StrictMode>
)
