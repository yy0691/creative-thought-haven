import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { EmotionCacheProvider } from './emotion-setup'

createRoot(document.getElementById("root")!).render(
  <EmotionCacheProvider>
    <App />
  </EmotionCacheProvider>
);
