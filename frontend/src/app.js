import './app.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import Main from './components/Main.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
      <Main />
  </BrowserRouter>
)
