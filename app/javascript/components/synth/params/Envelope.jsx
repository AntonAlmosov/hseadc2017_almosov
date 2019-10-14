import React from 'react'
import ToggleButton from '../../controlls/ToggleButton'
import Knob from '../../controlls/Knob'
import Picker from '../../controlls/Picker'

export default ({ synth, handler }) => {
  let attack = value => {
    handler('envelope', 'attackCurve', value)
  }
  let decay = value => {
    handler('envelope', 'decayCurve', value)
  }
  let release = value => {
    handler('envelope', 'releaseCurve', value)
  }
  return (
    <div className="envelope">
      <div className="left"></div>
      <div className="top"></div>
      <div className="right"></div>
      <div className="bottom"></div>
      <div className="row">
        <ToggleButton isTrue={true} handler={() => {}} text="ENVELOPE" />
        <Knob
          name="envelope"
          paramName="attack"
          min={1}
          max={100}
          increment={100}
          initialDeg={-45}
          overDeg={270}
          value={synth.synth.envelope.attack}
          handleValueChange={handler}
        />
        <Knob
          name="envelope"
          paramName="decay"
          min={1}
          max={100}
          increment={100}
          initialDeg={-45}
          overDeg={270}
          value={synth.synth.envelope.decay}
          handleValueChange={handler}
        />
        <Knob
          name="envelope"
          paramName="release"
          min={1}
          max={100}
          increment={100}
          initialDeg={-45}
          overDeg={270}
          value={synth.synth.envelope.release}
          handleValueChange={handler}
        />
      </div>
      <div className="row">
        <Knob
          name="envelope"
          paramName="sustain"
          min={1}
          max={100}
          increment={100}
          initialDeg={-45}
          overDeg={270}
          value={synth.synth.envelope.sustain}
          handleValueChange={handler}
        />
        <Picker
          current={synth.synth.envelope.attackCurve}
          items={['linear', 'exponential', 'step', 'sine']}
          names={['linear', 'exponential', 'step', 'sine']}
          handler={attack}
        />
        <Picker
          current={synth.synth.envelope.decayCurve}
          items={['linear', 'exponential']}
          names={['linear', 'exponential']}
          handler={decay}
        />
        <Picker
          current={synth.synth.envelope.releaseCurve}
          items={['linear', 'exponential', 'step', 'sine']}
          names={['linear', 'exponential', 'step', 'sine']}
          handler={release}
        />
      </div>
    </div>
  )
}
