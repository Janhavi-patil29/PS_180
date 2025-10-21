import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx' // Ensure this line imports App.tsx
import './index.css' // Optional default styles, can be removed if unused

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App /> {/* Ensure this line renders the App component */}
  </React.StrictMode>,
)