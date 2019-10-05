import React from 'react'
import ReactDOM from 'react-dom'

import Synthesizer from '../containers/Synthesizer'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Synthesizer />,
    document.body.appendChild(document.createElement('div')),
  )
})