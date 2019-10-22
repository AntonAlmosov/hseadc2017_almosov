import React from 'react'
import _ from 'lodash'
import ToggleButton from '../controlls/ToggleButton'
import Knob from '../controlls/Knob'
import Picker from '../controlls/Picker'

export default class Autopanner extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(this, 'handlerFilter', 'handlePicker', 'handlerFilterKnob')
  }

  handlePicker(value) {
    this.props.handler('autopanner', 'type', value)
  }

  handlerFilter(value) {
    this.props.subHandler('autopanner', 'filter', 'type', value)
  }
  handlerFilterKnob(name, param, value) {
    this.props.subHandler(name, 'filter', param, value)
  }

  render() {
    let value = this.props.value
    return (
      <div className="filter autopanner">
        <div className="row">
          <ToggleButton
            isTrue={this.props.isConnected}
            handler={() => this.props.handleConnect('autopanner')}
            text="AUTOPANNER"
          />
          <Knob
            name="autopanner"
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
            name="autopanner"
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
            name="autopanner"
            paramName="frequency"
            min={1}
            max={100}
            increment={1}
            initialDeg={-70}
            overDeg={270}
            value={value.frequency.value}
            handleValueChange={this.props.handler}
          />
        </div>
        <div className="row"></div>
        <div className="row"></div>
        <div className="left"></div>
        <div className="top"></div>
        <div className="right"></div>
        <div className="bottom"></div>
      </div>
    )
  }
}
