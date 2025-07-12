import React from "react"
import ReactDOM from "react-dom/client"
import { HashRouter } from "react-router-dom"
import './index.css'
import App from './App.tsx'

// 預設啟用 dark mode
if (typeof document !== 'undefined') {
  document.documentElement.classList.add('dark')
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
