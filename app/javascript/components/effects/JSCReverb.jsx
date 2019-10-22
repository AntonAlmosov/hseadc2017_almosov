import React from 'react'
import _ from 'lodash'
import ToggleButton from '../controlls/ToggleButton'
import Knob from '../controlls/Knob'
import Picker from '../controlls/Picker'

export default class JSCReverb extends React.Component {
  constructor(props) {
    super(props)

    // console.log(this.props.value.Q)
    _.bindAll(this, 'handlerFilter', 'handlePicker', 'handlerFilterKnob')
  }

  handlePicker(value) {
    this.props.handler('jscreverb', 'oversample', value)
  }

  handlerFilter(value) {
    this.props.subHandler('jscreverb', 'filter', 'type', value)
  }
  handlerFilterKnob(name, param, value) {
    this.props.subHandler(name, 'filter', param, value)
  }

  render() {
    let value = this.props.value
    return (
      <div className="filter jscreverb">
        <div className="row">
          <ToggleButton
            isTrue={this.props.isConnected}
            handler={() => this.props.handleConnect('jscreverb')}
            text="jscreverb"
          />
        </div>
        <div className="row">
          <Knob
            name="jscreverb"
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
            name="jscreverb"
            paramName="roomSize"
            min={0}
            max={100}
            increment={100}
            initialDeg={-45}
            overDeg={270}
            value={value.roomSize.value}
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
