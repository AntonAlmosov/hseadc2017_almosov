import React from 'react'

import KnobParam from './KnobParam'
import Display from './Display'

export default class ChorusPedal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 2
    }
    this.changeEffect = this.changeEffect.bind(this)
  }

  changeEffect(effectName, paramName, increment, value) {
    this.props.handler(effectName, paramName, increment, value)

    if (paramName == 'wet') this.setState({ current: 2 })
    if (paramName == 'octaves') this.setState({ current: 1 })
    if (paramName == 'baseFrequency') this.setState({ current: 0 })
  }

  render() {
    return (
      <div className="pedal">
        <h1>Phaser</h1>
        <Display
          current={this.state.current}
          info={[
            {
              name: 'Base Frequency',
              value: this.props.value.baseFrequency.toFixed(0) + 'hz'
            },
            {
              name: 'Octaves',
              value: Math.floor(this.props.value.octaves) + ' oct'
            },
            {
              name: 'Wet',
              value: this.props.value.wet.value.toFixed(2)
            }
          ]}
        />
        <KnobParam
          name="phaser"
          paramName="baseFrequency"
          min={1}
          max={100}
          increment={0.1}
          initialDeg={-45}
          overDeg={270}
          value={this.props.value.baseFrequency}
          handleValueChange={this.changeEffect}
        />
        <KnobParam
          name="phaser"
          paramName="octaves"
          min={1}
          max={8}
          increment={1}
          initialDeg={-45}
          overDeg={270}
          value={this.props.value.octaves}
          handleValueChange={this.changeEffect}
        />
        <KnobParam
          name="phaser"
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
