import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n';
import { NotFoundPage } from './components/NotFoundPage.tsx'

const is404 = window.location.pathname !== '/' && window.location.pathname !== '/index.html';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {is404 ? <NotFoundPage /> : <App />}
  </StrictMode>,
)
