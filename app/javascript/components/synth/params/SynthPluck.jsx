import React from 'react'
import Knob from '../../controlls/Knob'

export default ({ synth, handler }) => {
  return (
    <div className="synthParams row">
      <div className="synthGeneralParams">
        <Knob
          name="synth"
          paramName="attackNoise"
          min={1}
          max={200}
          increment={10}
          initialDeg={-45}
          overDeg={270}
          value={synth.synth.attackNoise}
          handleValueChange={handler}
        />
        <Knob
          name="synth"
          paramName="dampening"
          min={1}
          max={100}
          increment={0.1}
          initialDeg={-45}
          overDeg={270}
          value={synth.synth.dampening.value}
          handleValueChange={handler}
        />
        <Knob
          name="synth"
          paramName="resonance"
          min={0}
          max={100}
          increment={100}
          initialDeg={-45}
          overDeg={270}
          value={synth.synth.resonance.value}
          handleValueChange={handler}
        />
        <div className="left"></div>
        <div className="top"></div>
        <div className="right"></div>
        <div className="bottom"></div>
      </div>
    </div>
  )
}
