import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { TranslationProvider } from './contexts/TranslationContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TranslationProvider>
        <App />
      </TranslationProvider>
    </BrowserRouter>
  </StrictMode>,
)
