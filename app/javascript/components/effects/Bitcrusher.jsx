import React from 'react'
import _ from 'lodash'
import ToggleButton from '../controlls/ToggleButton'
import Knob from '../controlls/Knob'
import Picker from '../controlls/Picker'

export default class Bitcrusher extends React.Component {
  constructor(props) {
    super(props)

    // console.log(this.props.value.Q)
    _.bindAll(this, 'handlerFilter', 'handlePicker', 'handlerFilterKnob')
  }

  handlePicker(value) {
    this.props.handler('bitcrusher', 'type', value)
  }

  handlerFilter(value) {
    this.props.subHandler('bitcrusher', 'filter', 'type', value)
  }
  handlerFilterKnob(name, param, value) {
    this.props.subHandler(name, 'filter', param, value)
  }

  render() {
    let value = this.props.value
    return (
      <div className="filter bitcrusher">
        <div className="row">
          <ToggleButton
            isTrue={this.props.isConnected}
            handler={() => this.props.handleConnect('bitcrusher')}
            text="bitcrusher"
          />
          <Knob
            name="bitcrusher"
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
            name="bitcrusher"
            paramName="bits"
            min={1}
            max={8}
            increment={1}
            initialDeg={-60}
            overDeg={270}
            value={value.bits}
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
