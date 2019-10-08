import React from 'react'
import ReactDOM from 'react-dom'

import SynthCotainer from '../containers/SynthCotainer'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render( <
    SynthCotainer / > ,
    document.body.appendChild(document.createElement('div')),
  )
})