import React from 'react'
import _ from 'lodash'
import ToggleButton from '../controlls/ToggleButton'
import Knob from '../controlls/Knob'
import Picker from '../controlls/Picker'

export default class Autofilter extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, 'handlerFilter', 'handlePicker', 'handlerFilterKnob')
  }

  handlePicker(value) {
    this.props.handler('autofilter', 'type', value)
  }

  handlerFilter(value) {
    this.props.subHandler('autofilter', 'filter', 'type', value)
  }
  handlerFilterKnob(name, param, value) {
    this.props.subHandler(name, 'filter', param, value)
  }

  render() {
    let value = this.props.value
    return (
      <div className="filter autofiler">
        <div className="row">
          <ToggleButton
            isTrue={this.props.isConnected}
            handler={() => this.props.handleConnect('autofilter')}
            text="AUTOFILTER"
          />
          <Knob
            name="autofilter"
            paramName="baseFrequensy"
            min={1}
            max={100}
            increment={0.005}
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
            handler={this.handlePicker}
          />
          <Knob
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
            paramName="octaves"
            min={1}
            max={6}
            increment={1}
            initialDeg={-70}
            overDeg={270}
            value={value.octaves}
            handleValueChange={this.props.handler}
          />
        </div>
        <div className="row">
          <Picker
            current={value.filter.type}
            items={['lowpass', 'highpass']}
            names={['lowpass', 'highpass']}
            handler={this.handlerFilter}
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
            handleValueChange={this.handlerFilterKnob}
          />
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
