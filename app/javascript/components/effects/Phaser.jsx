import React from 'react'
import _ from 'lodash'
import ToggleButton from '../controlls/ToggleButton'
import Knob from '../controlls/Knob'
import Picker from '../controlls/Picker'

export default class Phaser extends React.Component {
  constructor(props) {
    super(props)

    // console.log(this.props.value.Q)
    _.bindAll(this, 'handlerFilter', 'handlePicker', 'handlerFilterKnob')
  }

  handlePicker(value) {
    this.props.handler('phaser', 'oversample', value)
  }

  handlerFilter(value) {
    this.props.subHandler('phaser', 'filter', 'type', value)
  }
  handlerFilterKnob(name, param, value) {
    this.props.subHandler(name, 'filter', param, value)
  }

  render() {
    let value = this.props.value
    return (
      <div className="filter phaser">
        <div className="row">
          <ToggleButton
            isTrue={this.props.isConnected}
            handler={() => this.props.handleConnect('phaser')}
            text="phaser"
          />
          <Knob
            name="phaser"
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
            name="phaser"
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
            name="phaser"
            paramName="baseFrequensy"
            min={1}
            max={100}
            increment={0.1}
            initialDeg={-45}
            overDeg={270}
            value={value.baseFrequensy}
            handleValueChange={this.props.handler}
          />
        </div>
        <div className="row">
          <Knob
            name="phaser"
            paramName="Q"
            min={1}
            max={100}
            increment={10}
            initialDeg={-45}
            overDeg={270}
            value={value.Q.value}
            handleValueChange={this.props.handler}
          />
          <Knob
            name="phaser"
            paramName="octaves"
            min={1}
            max={8}
            increment={1}
            initialDeg={-45}
            overDeg={270}
            value={value.octaves}
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
