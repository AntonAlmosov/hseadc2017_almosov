import React from 'react'

import Knob from './Knob'
import KnobParam from './KnobParam'
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
    this.handleOctave = this.handleOctave.bind(this)
    this.handleNoteLength = this.handleNoteLength.bind(this)
  }

  handleVolumeChange(effectName, paramName, increment, value) {
    if (paramName == 'volume') this.setState({ current: 0 })
    if (paramName == 'pan') this.setState({ current: 2 })
    this.props.handleVolumeChange(effectName, paramName, increment, value)
  }

  handleBpmChange(effectName, value) {
    this.setState({
      current: 1
    })
    this.props.handleBpmChange(effectName, value)
  }

  handleOctave(value) {
    this.setState({
      current: 3
    })
    this.props.octaveHandler(value)
  }

  handleSynthSwitch(value) {
    this.props.handleSynthSwitch(value)
  }

  handleNoteLength(type, value) {
    this.props.handleNoteLength(type, value)
  }

  render() {
    return (
      <div className="sequensorTopControlls">
        <div className="row">
          <KnobParam
            name="volume"
            paramName="volume"
            min={-80}
            max={80}
            increment={1}
            initialDeg={90}
            overDeg={120}
            value={this.props.volumeValue.volume.value}
            handleValueChange={this.handleVolumeChange}
          />
          <Display
            current={this.state.current}
            info={[
              {
                name: 'Volume',
                value: Math.floor(this.props.volumeValue.volume.value) + ' DB'
              },
              {
                name: 'BPM',
                value: Math.floor(this.props.bpmValue)
              },
              {
                name: 'Pan',
                value: this.props.volumeValue.pan.value.toFixed(2)
              },
              {
                name: 'Octave',
                value: this.props.octave
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
                `${this.props.synth}` == 'MetalSynths'
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
        <div className="row">
          <KnobParam
            name="volume"
            paramName="pan"
            min={-100}
            max={100}
            increment={100}
            initialDeg={90}
            overDeg={120}
            value={this.props.volumeValue.pan.value}
            handleValueChange={this.handleVolumeChange}
          />
          <div className="octaveSwitcher">
            <div
              onClick={() => this.handleOctave(1)}
              className={
                this.props.octave == '1'
                  ? 'octaveButton active'
                  : 'octaveButton'
              }
            ></div>
            <div
              onClick={() => this.handleOctave(2)}
              className={
                this.props.octave == '2'
                  ? 'octaveButton active'
                  : 'octaveButton'
              }
            ></div>
            <div
              onClick={() => this.handleOctave(3)}
              className={
                this.props.octave == '3'
                  ? 'octaveButton active'
                  : 'octaveButton'
              }
            ></div>
            <div
              onClick={() => this.handleOctave(4)}
              className={
                this.props.octave == '4'
                  ? 'octaveButton active'
                  : 'octaveButton'
              }
            ></div>
            <div
              onClick={() => this.handleOctave(5)}
              className={
                this.props.octave == '5'
                  ? 'octaveButton active'
                  : 'octaveButton'
              }
            ></div>
            <div
              onClick={() => this.handleOctave(6)}
              className={
                this.props.octave == '6'
                  ? 'octaveButton active'
                  : 'octaveButton'
              }
            ></div>
            <div
              onClick={() => this.handleOctave(7)}
              className={
                this.props.octave == '7'
                  ? 'octaveButton active'
                  : 'octaveButton'
              }
            ></div>
            <div
              onClick={() => this.handleOctave(8)}
              className={
                this.props.octave == '8'
                  ? 'octaveButton active'
                  : 'octaveButton'
              }
            ></div>
          </div>
          <div className="synthSwitchSquare">
            <div
              onClick={() => this.handleNoteLength('sequenseNoteLength', '2n')}
              className={
                this.props.sequenseNoteLength == '2n'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              1/2
            </div>
            <div
              onClick={() => this.handleNoteLength('sequenseNoteLength', '4n')}
              className={
                this.props.sequenseNoteLength == '4n'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              1/4
            </div>
            <div
              onClick={() => this.handleNoteLength('sequenseNoteLength', '8n')}
              className={
                this.props.sequenseNoteLength == '8n'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              1/8
            </div>
            <div
              onClick={() => this.handleNoteLength('sequenseNoteLength', '16n')}
              className={
                this.props.sequenseNoteLength == '16n'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              1/16
            </div>
          </div>
        </div>
      </div>
    )
  }
}
