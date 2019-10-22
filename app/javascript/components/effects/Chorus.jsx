import React from 'react'
import _ from 'lodash'
import ToggleButton from '../controlls/ToggleButton'
import Knob from '../controlls/Knob'
import Picker from '../controlls/Picker'

export default class Chorus extends React.Component {
  constructor(props) {
    super(props)

    // console.log(this.props.value.Q)
    _.bindAll(this, 'handlerFilter', 'handlePicker', 'handlerFilterKnob')
  }

  handlePicker(value) {
    this.props.handler('chorus', 'oversample', value)
  }

  handlerFilter(value) {
    this.props.subHandler('chorus', 'filter', 'type', value)
  }
  handlerFilterKnob(name, param, value) {
    this.props.subHandler(name, 'filter', param, value)
  }

  render() {
    let value = this.props.value
    return (
      <div className="filter chorus">
        <div className="row">
          <ToggleButton
            isTrue={this.props.isConnected}
            handler={() => this.props.handleConnect('chorus')}
            text="chorus"
          />
          <Knob
            name="chorus"
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
          <Knob
            name="chorus"
            paramName="frequency"
            min={1}
            max={100}
            increment={1}
            initialDeg={-45}
            overDeg={270}
            value={value.frequency.value}
            handleValueChange={this.props.handler}
          />
          <Knob
            name="chorus"
            paramName="delayTime"
            min={2}
            max={20}
            increment={1}
            initialDeg={-45}
            overDeg={270}
            value={value.delayTime}
            handleValueChange={this.props.handler}
          />
        </div>
        <div className="row">
          <Knob
            name="chorus"
            paramName="depth"
            min={2}
            max={20}
            increment={1}
            initialDeg={-45}
            overDeg={270}
            value={value.depth}
            handleValueChange={this.props.handler}
          />
          <Knob
            name="chorus"
            paramName="spread"
            min={0}
            max={180}
            increment={1}
            initialDeg={-45}
            overDeg={270}
            value={value.spread}
            handleValueChange={this.props.handler}
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
