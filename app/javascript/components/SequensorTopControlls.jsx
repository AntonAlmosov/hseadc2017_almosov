import React from 'react'

import Knob from './Knob'
import Display from './Display'

export default class SequensorTopControlls extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 0
    }
    this.handleVolumeChange = this.handleVolumeChange.bind(this)
    this.handleBpmChange = this.handleBpmChange.bind(this)
    this.handleSynthSwitch = this.handleSynthSwitch.bind(this)
  }

  handleVolumeChange(effectName, value) {
    this.setState({
      current: 0
    })
    this.props.handleVolumeChange(effectName, value)
  }

  handleBpmChange(effectName, value) {
    this.setState({
      current: 1
    })
    this.props.handleBpmChange(effectName, value)
  }

  handleSynthSwitch(value) {
    this.props.handleSynthSwitch(value)
  }

  render() {
    return (
      <div className="sequensorTopControlls">
        <Knob
          name="volume"
          min={-80}
          max={80}
          initialDeg={90}
          overDeg={120}
          value={this.props.volumeValue}
          handleValueChange={this.handleVolumeChange}
        />
        <Display
          current={this.state.current}
          info={[
            {
              name: 'Volume',
              value: Math.floor(this.props.volumeValue) + 'l'
            },
            {
              name: 'BPM',
              value: Math.floor(this.props.bpmValue)
            }
          ]}
        />
        <Knob
          name="BPM"
          min={80}
          max={220}
          initialDeg={-182}
          overDeg={400}
          value={this.props.bpmValue}
          handleValueChange={this.handleBpmChange}
        />
        <div className="synthSwitchWrapper">
          <div
            onClick={() => this.handleSynthSwitch('pluck')}
            className={
              `${this.props.synth}` == 'PluckSynth'
                ? 'synthSwitch active'
                : 'synthSwitch'
            }
          >
            Pluck
          </div>
          <div
            onClick={() => this.handleSynthSwitch('membrane')}
            className={
              `${this.props.synth}` == 'MembraneSynth'
                ? 'synthSwitch active'
                : 'synthSwitch'
            }
          >
            Membrane
          </div>
          <div
            onClick={() => this.handleSynthSwitch('metal')}
            className={
              `${this.props.synth}` == 'AMSynth'
                ? 'synthSwitch active'
                : 'synthSwitch'
            }
          >
            Howling
          </div>
          <div
            onClick={() => this.handleSynthSwitch('normal')}
            className={
              `${this.props.synth}` == 'Synth'
                ? 'synthSwitch active'
                : 'synthSwitch'
            }
          >
            Normal
          </div>
        </div>
      </div>
    )
  }
}
