import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './css/index.css'
import App from './App.jsx'   // component to be rendered

// initiliaze virtual DOM and start rendering at the root element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>   
      <App />
    </BrowserRouter>
  </StrictMode>,
)
