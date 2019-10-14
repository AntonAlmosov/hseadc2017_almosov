import React from 'react'
import Knob from '../../controlls/Knob'
import Envelope from './Envelope'
import Oscillator from './Oscillator'

export default ({ synth, handler, synthHandler }) => {
  return (
    <div className="synthParams row">
      <div className="synthGeneralParams">
        <Knob
          name="synth"
          paramName="portamento"
          min={0}
          max={100}
          increment={100}
          initialDeg={-45}
          overDeg={270}
          value={synth.synth.portamento}
          handleValueChange={handler}
        />
        <Knob
          name="synth"
          paramName="detune"
          min={0}
          max={100}
          increment={1}
          initialDeg={-45}
          overDeg={270}
          value={synth.synth.detune.value}
          handleValueChange={handler}
        />
        <div className="left"></div>
        <div className="top"></div>
        <div className="right"></div>
        <div className="bottom"></div>
      </div>
      <div className="col">
        <Envelope synth={synth} handler={synthHandler} />
        <Oscillator synth={synth.synth} handler={synthHandler} />
      </div>
    </div>
  )
}
