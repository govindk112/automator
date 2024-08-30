import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import "./components/styles.css"

const root = ReactDOM.createRoot(document.getElementById('root'))
console.log = function () { };

// Disable console.warn
console.warn = function () { };

// Disable console.error
console.error = function () { };

// Disable console.info
console.info = function () { };
root.render(
  
    <App />
  
)

