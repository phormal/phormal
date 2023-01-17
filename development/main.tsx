import React from 'react'
import ReactDOM from 'react-dom'
import ReactTests from "../tests/pages/ReactTests";
import './style.scss'

ReactDOM.render(
  <React.StrictMode>
    <ReactTests />
  </React.StrictMode>,
  document.getElementById('app-react') as HTMLElement
)
