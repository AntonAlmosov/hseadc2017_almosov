import React from 'react'
import Autofilter from './Autofilter'

export default ({ synth, handler }) => {
  return (
    <div className="effectsWrapper row">
      <Autofilter value={synth.autofilter} handler={handler} />
    </div>
  )
}
