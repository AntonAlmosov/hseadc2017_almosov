import React from 'react'
import _ from 'lodash'
import ToggleButton from '../controlls/ToggleButton'
import Knob from '../controlls/Knob'
import Picker from '../controlls/Picker'

export default class Autowah extends React.Component {
  constructor(props) {
    super(props)

    // console.log(this.props.value.Q)
    _.bindAll(this, 'handlerFilter', 'handlePicker', 'handlerFilterKnob')
  }

  handlePicker(value) {
    this.props.handler('autowah', 'type', value)
  }

  handlerFilter(value) {
    this.props.subHandler('autowah', 'filter', 'type', value)
  }
  handlerFilterKnob(name, param, value) {
    this.props.subHandler(name, 'filter', param, value)
  }

  render() {
    let value = this.props.value
    return (
      <div className="filter autowah">
        <div className="row">
          <ToggleButton isTrue={true} handler={() => {}} text="autowah" />
          <Knob
            name="autowah"
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
            name="autowah"
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
            name="autowah"
            paramName="sensitivity"
            min={-50}
            max={50}
            increment={1}
            initialDeg={45}
            overDeg={135}
            value={value.sensitivity}
            handleValueChange={this.props.handler}
          />
        </div>
        <div className="row">
          <Knob
            name="autowah"
            paramName="gain"
            min={0}
            max={100}
            increment={100}
            initialDeg={-45}
            overDeg={270}
            value={value.gain.value}
            handleValueChange={this.props.handler}
          />
          <Knob
            name="autowah"
            paramName="octaves"
            min={1}
            max={10}
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
