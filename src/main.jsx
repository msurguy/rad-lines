import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './sass/bootstrap.scss'
import ReactGA from "react-ga4";

// Initialize Google Analytics
ReactGA.initialize("G-PXKJMQHXV3");

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
