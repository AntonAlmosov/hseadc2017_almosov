import React from 'react'
import _ from 'lodash'
import ToggleButton from '../controlls/ToggleButton'
import Knob from '../controlls/Knob'
import Picker from '../controlls/Picker'

export default class Chebyshev extends React.Component {
  constructor(props) {
    super(props)

    // console.log(this.props.value.Q)
    _.bindAll(this, 'handlerFilter', 'handlePicker', 'handlerFilterKnob')
  }

  handlePicker(value) {
    this.props.handler('chebyshev', 'oversample', value)
  }

  handlerFilter(value) {
    this.props.subHandler('chebyshev', 'filter', 'type', value)
  }
  handlerFilterKnob(name, param, value) {
    this.props.subHandler(name, 'filter', param, value)
  }

  render() {
    let value = this.props.value
    return (
      <div className="filter chebyshev">
        <div className="row">
          <ToggleButton
            isTrue={this.props.isConnected}
            handler={() => this.props.handleConnect('chebyshev')}
            text="chebyshev"
          />
          <Knob
            name="chebyshev"
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
            name="chebyshev"
            paramName="order"
            min={1}
            max={10}
            increment={1}
            initialDeg={-45}
            overDeg={270}
            value={value.order}
            handleValueChange={this.props.handler}
          />
          <Picker
            current={value.oversample}
            items={['none', '2x', '4x']}
            names={['none', '2x', '4x']}
            handler={this.handlePicker}
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
