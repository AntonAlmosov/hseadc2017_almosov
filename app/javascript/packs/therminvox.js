import React from 'react'
import ReactDOM from 'react-dom'

import Thereminvox from '../containers/Therminvox'

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Thereminvox />,
    document.body.appendChild(document.createElement('div'))
  )
})
