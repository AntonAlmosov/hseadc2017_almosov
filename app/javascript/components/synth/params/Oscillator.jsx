import React from 'react'
import ToggleButton from '../../controlls/ToggleButton'
import Knob from '../../controlls/Knob'
import Picker from '../../controlls/Picker'
import OscillatorPicker from '../../controlls/OscillatorPicker'

export default ({ synth, handler }) => {
  let type = synth.oscillator.sourceType
  let notPwmPulse = type != 'pulse' && type != 'pwm'
  let isAmFm = type == 'am' || type == 'fm'
  let handleType = value => {
    handler('oscillator', 'baseType', value)
  }
  let handleModType = value => {
    handler('oscillator', 'modulationType', value)
  }
  return (
    <div className="oscillator">
      <div className="left"></div>
      <div className="top"></div>
      <div className="right"></div>
      <div className="bottom"></div>
      <div className="row">
        <div className="row">
          <div className="left"></div>
          <div className="top"></div>
          <div className="right"></div>
          <div className="bottom"></div>
          <ToggleButton isTrue={true} handler={() => {}} text="OSCILLATOR" />
          <OscillatorPicker
            current={synth.oscillator.sourceType}
            items={['oscillator', 'fm', 'am', 'fat', 'pulse', 'pwm']}
            names={['Normal', 'fm', 'am', 'fat', 'pulse', 'pwm']}
            handler={handler}
            name="oscillator"
            paramName="sourceType"
          />
        </div>
        {notPwmPulse && (
          <Knob
            name="oscillator"
            paramName="partialCount"
            min={1}
            max={32}
            increment={1}
            initialDeg={-45}
            overDeg={270}
            value={synth.oscillator.partialCount}
            handleValueChange={handler}
          />
        )}
        {type == 'pulse' && (
          <Knob
            name="oscillator"
            paramName="width"
            min={1}
            max={100}
            increment={100}
            initialDeg={-45}
            overDeg={270}
            value={synth.oscillator.width.value}
            handleValueChange={handler}
          />
        )}
        {type == 'pwm' && (
          <Knob
            name="oscillator"
            paramName="modulationFrequency"
            min={1}
            max={100}
            increment={10}
            initialDeg={-45}
            overDeg={270}
            value={synth.oscillator.modulationFrequency.value}
            handleValueChange={handler}
          />
        )}
      </div>
      <div className="row">
        {notPwmPulse && (
          <Picker
            current={synth.oscillator.baseType}
            items={['sine', 'square', 'sawtooth', 'triangle']}
            names={['sine', 'square', 'sawtooth', 'triangle']}
            handler={handleType}
          />
        )}
        {isAmFm && (
          <div>
            <Knob
              name="oscillator"
              paramName="harmonicity"
              min={1}
              max={100}
              increment={2}
              initialDeg={-45}
              overDeg={270}
              value={synth.oscillator.harmonicity.value}
              handleValueChange={handler}
            />
          </div>
        )}
        {type == 'fm' && (
          <Knob
            name="oscillator"
            paramName="modulationIndex"
            min={1}
            max={200}
            increment={100}
            initialDeg={-45}
            overDeg={270}
            value={synth.oscillator.modulationIndex.value}
            handleValueChange={handler}
          />
        )}
        {isAmFm && (
          <Picker
            current={synth.oscillator.modulationType}
            items={['sine', 'square', 'sawtooth', 'triangle']}
            names={['sine', 'square', 'sawtooth', 'triangle']}
            handler={handleModType}
          />
        )}
        {type == 'fat' && (
          <div className="row">
            <Knob
              name="oscillator"
              paramName="spread"
              min={1}
              max={100}
              increment={1}
              initialDeg={-45}
              overDeg={270}
              value={synth.oscillator.spread}
              handleValueChange={handler}
            />
            <Knob
              name="oscillator"
              paramName="count"
              min={1}
              max={10}
              increment={1}
              initialDeg={-45}
              overDeg={270}
              value={synth.oscillator.count}
              handleValueChange={handler}
            />
          </div>
        )}
      </div>
    </div>
  )
}
