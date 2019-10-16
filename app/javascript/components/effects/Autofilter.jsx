import React from 'react'
import _ from 'lodash'
import ToggleButton from '../controlls/ToggleButton'
import Knob from '../controlls/Knob'
import Picker from '../controlls/Picker'

export default class Autofilter extends React.Component {
  constructor(props) {
    super(props)

    console.log(this.props.value)
    _.bindAll(this, 'handlerFilter')
  }

  handlerFilter(name, param, value) {
    this.this.props.handler(name, param, value, 'filter')
  }

  render() {
    let value = this.props.value
    console.log(value.baseFrequensy)
    return (
      <div className="filter autofiler">
        <div className="row">
          <ToggleButton isTrue={true} handler={() => {}} text="AUTOFILTER" />
          <Knob
            name="autofilter"
            paramName="baseFrequensy"
            min={1}
            max={100}
            increment={0.1}
            initialDeg={-45}
            overDeg={270}
            value={value.baseFrequensy}
            handleValueChange={this.props.handler}
          />
          <Knob
            name="autofilter"
            paramName="wet"
            min={1}
            max={100}
            increment={100}
            initialDeg={-45}
            overDeg={270}
            value={value.wet.value}
            handleValueChange={this.props.handler}
          />
        </div>
        <div className="row">
          <Picker
            current={value.type}
            items={['sine', 'square', 'sawtooth', 'triangle']}
            names={['sine', 'square', 'sawtooth', 'triangle']}
            handler={this.props.handler}
          />
          {/* <Knob
            name="autofilter"
            paramName="depth"
            min={1}
            max={100}
            increment={100}
            initialDeg={-45}
            overDeg={270}
            value={value.depth.value}
            handleValueChange={this.props.handler}
          />
          <Knob
            name="autofilter"
            paramName="frequensy"
            min={1}
            max={100}
            increment={0.1}
            initialDeg={-45}
            overDeg={270}
            value={value.frequensy}
            handleValueChange={this.props.handler}
          /> */}
        </div>
        <div className="row">
          <Picker
            current={value.filter.type}
            items={['lowpass', 'highpass', 'notch', 'allpass']}
            names={['lowpass', 'highpass', 'notch', 'allpass']}
            handler={this.handlerFilter}
          />
          {/* <Knob
            name="autofilter"
            paramName="frequensy"
            min={1}
            max={100}
            increment={0.1}
            initialDeg={-45}
            overDeg={270}
            value={value.filter.frequensy.value}
            handleValueChange={this.handlerFilter}
          />
          <Knob
            name="autofilter"
            paramName="detune"
            min={1}
            max={100}
            increment={10}
            initialDeg={-45}
            overDeg={270}
            value={value.filter.detune.value}
            handleValueChange={this.handlerFilter}
          /> */}
        </div>
        <div className="row"></div>
        <div className="left"></div>
        <div className="top"></div>
        <div className="right"></div>
        <div className="bottom"></div>
      </div>
    )
  }
}
