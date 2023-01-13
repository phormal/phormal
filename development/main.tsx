import React from 'react'
import ReactDOM from 'react-dom'
import App from './Dev'
import './style.scss'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('app-react') as HTMLElement
)
