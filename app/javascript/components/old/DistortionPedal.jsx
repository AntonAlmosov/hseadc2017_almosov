import React from 'react'

import KnobParam from './KnobParam'
import Display from './Display'

export default class DistortionPedal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      type: this.props.value.oversample
    }
    this.changeEffect = this.changeEffect.bind(this)
    this.handleType = this.handleType.bind(this)
  }

  changeEffect(effectName, paramName, increment, value) {
    this.props.handler(effectName, paramName, increment, value)

    if (paramName == 'wet') this.setState({ current: 0 })
    if (paramName == 'distortion') this.setState({ current: 1 })
  }

  handleType(value) {
    this.props.handler('distortion', 'oversample', 0, value)
    this.setState({
      type: value
    })
  }

  render() {
    return (
      <div className="pedal">
        <h1>Distortion</h1>
        <Display
          current={this.state.current}
          info={[
            {
              name: 'Wet',
              value: this.props.value.wet.value.toFixed(2)
            },
            {
              name: 'Distortion',
              value: this.props.value.distortion.toFixed(2)
            }
          ]}
        />
        <div className="synthSwitchWrapperThree">
          <div
            onClick={() => this.handleType('none')}
            className={
              `${this.state.type}` == 'none'
                ? 'synthSwitch active'
                : 'synthSwitch'
            }
          >
            none
          </div>
          <div
            onClick={() => this.handleType('2x')}
            className={
              `${this.state.type}` == '2x'
                ? 'synthSwitch active'
                : 'synthSwitch'
            }
          >
            2x
          </div>
          <div
            onClick={() => this.handleType('4x')}
            className={
              `${this.state.type}` == '4x'
                ? 'synthSwitch active'
                : 'synthSwitch'
            }
          >
            4x
          </div>
        </div>
        <KnobParam
          name="distortion"
          paramName="distortion"
          min={0}
          max={100}
          increment={10}
          initialDeg={-45}
          overDeg={270}
          value={this.props.value.distortion}
          handleValueChange={this.changeEffect}
        />
        <KnobParam
          name="distortion"
          paramName="wet"
          min={0}
          max={100}
          increment={100}
          initialDeg={-45}
          overDeg={270}
          value={this.props.value.wet.value}
          handleValueChange={this.changeEffect}
        />
      </div>
    )
  }
}
