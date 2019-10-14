import React from 'react'

import KnobParam from './KnobParam'
import Display from './Display'

export default class ChorusPedal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      type: this.props.value.type
    }
    this.changeEffect = this.changeEffect.bind(this)
    this.handleType = this.handleType.bind(this)
  }

  changeEffect(effectName, paramName, increment, value) {
    this.props.handler(effectName, paramName, increment, value)

    if (paramName == 'wet') this.setState({ current: 0 })
    if (paramName == 'delayTime') this.setState({ current: 1 })
    if (paramName == 'depth') this.setState({ current: 2 })
    if (paramName == 'frequency') this.setState({ current: 3 })
  }

  handleType(value) {
    this.props.handler('chorus', 'type', 0, value)
    this.setState({
      type: value
    })
  }

  render() {
    return (
      <div className="pedal">
        <h1>Chorus</h1>
        <Display
          current={this.state.current}
          info={[
            {
              name: 'Wet',
              value: this.props.value.wet.value.toFixed(2)
            },
            {
              name: 'Delay Time',
              value: Math.floor(this.props.value.delayTime) + 'ms'
            },
            {
              name: 'Depth',
              value: this.props.value.depth.toFixed(2)
            },
            {
              name: 'Frequency',
              value: this.props.value.frequency.value.toFixed(1) + 'hZ'
            }
          ]}
        />
        <div className="synthSwitchWrapper">
          <div
            onClick={() => this.handleType('sine')}
            className={
              `${this.state.type}` == 'sine'
                ? 'synthSwitch active'
                : 'synthSwitch'
            }
          >
            Sine
          </div>
          <div
            onClick={() => this.handleType('square')}
            className={
              `${this.state.type}` == 'square'
                ? 'synthSwitch active'
                : 'synthSwitch'
            }
          >
            Square
          </div>
          <div
            onClick={() => this.handleType('sawtooth')}
            className={
              `${this.state.type}` == 'sawtooth'
                ? 'synthSwitch active'
                : 'synthSwitch'
            }
          >
            Sawtooth
          </div>
          <div
            onClick={() => this.handleType('triangle')}
            className={
              `${this.state.type}` == 'triangle'
                ? 'synthSwitch active'
                : 'synthSwitch'
            }
          >
            Triangle
          </div>
        </div>
        <KnobParam
          name="chorus"
          paramName="delayTime"
          min={20}
          max={200}
          increment={10}
          initialDeg={-45}
          overDeg={270}
          value={this.props.value.delayTime}
          handleValueChange={this.changeEffect}
        />
        <KnobParam
          name="chorus"
          paramName="depth"
          min={0}
          max={100}
          increment={2}
          initialDeg={-45}
          overDeg={270}
          value={this.props.value.depth}
          handleValueChange={this.changeEffect}
        />
        <KnobParam
          name="chorus"
          paramName="frequency"
          min={1}
          max={101}
          increment={1}
          initialDeg={-45}
          overDeg={270}
          value={this.props.value.frequency.value}
          handleValueChange={this.changeEffect}
        />
        <KnobParam
          name="chorus"
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
