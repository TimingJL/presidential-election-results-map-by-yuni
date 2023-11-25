import React from 'react'
import ReactDOM from 'react-dom/client'

import 'swiper/css';
import 'rc-tooltip/assets/bootstrap_white.css';
import "aos/dist/aos.css";

import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
