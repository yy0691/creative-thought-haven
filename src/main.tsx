import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ImageViewerProvider } from './components/ImageViewer.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ImageViewerProvider>
      <App />
    </ImageViewerProvider>
  </React.StrictMode>,
)
