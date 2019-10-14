import React from 'react'
import _ from 'lodash'

import KeyboradListener from '../components/synth/KeyboradListener'
import Picker from '../components/controlls/Picker'
import Sequensor from '../components/synth/Sequensor'
import CloseButton from '../components/controlls/CloseButton'
import ToggleButton from '../components/controlls/ToggleButton'
import Knob from '../components/controlls/Knob'
import SynthButton from '../components/controlls/SynthButton'
import SynthParams from '../components/synth/SynthParams'

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.props.value

    _.bindAll(
      this,
      'handleSynthChange',
      'handleSwitch',
      'handleOctave',
      'handleSequense',
      'handleSolo',
      'handleValueChange',
      'handleRename',
      'handleSynthValueChange'
    )
  }

  handleRename(value, n) {
    this.props.handleRename(value.target.value, this.props.n)
  }

  handleSynthChange(value) {
    this.props.handleSynthChange(value, this.props.n)
    this.forceUpdate()
  }

  handleOctave(value) {
    this.props.handleOctave(value, this.props.n)
    this.forceUpdate()
  }

  handleSwitch(value) {
    this.props.changeView(value)
    this.forceUpdate()
  }

  handleSequense(newSequense) {
    this.props.handleSequense(newSequense, this.props.n)
  }
  handleSolo() {
    let solo = !this.state.channel.solo
    this.props.handleValueChange('channel', 'solo', solo, this.props.n)
    this.forceUpdate()
  }
  handleValueChange(name, param, value) {
    this.props.handleValueChange(name, param, value, this.props.n)
    this.forceUpdate()
  }
  handleSynthValueChange(name, param, value) {
    this.props.handleSynthValueChange(name, param, value, this.props.n)
    this.forceUpdate()
  }

  render() {
    return (
      <div>
        <KeyboradListener
          synth={this.state.synth}
          octave={this.state.octave}
          handlePlay={this.props.handlePlay}
          changeView={this.handleSwitch}
        />
        <div className="row">
          <div className="sequensorControllsWrapper">
            <div className="sequensorTopControlls">
              <CloseButton handler={this.props.changeView} />
              <SynthButton
                name={this.state.name}
                nameHandler={this.handleRename}
              />
              <ToggleButton
                isTrue={this.state.channel.solo}
                handler={this.handleSolo}
                customClass="yellow"
                text={'CUE'}
              />
              <Picker
                current={this.state.synth}
                items={['Synth', 'MembraneSynth', 'PluckSynth']}
                names={['Normal', 'Drums', 'Pluck']}
                handler={this.handleSynthChange}
              />
              <Knob
                name="channel"
                paramName="volume"
                min={-100}
                max={100}
                increment={1}
                initialDeg={90}
                overDeg={135}
                value={this.state.channel.volume.value}
                handleValueChange={this.handleValueChange}
                synthN={this.props.n}
              />
              <Knob
                name="channel"
                paramName="pan"
                min={-100}
                max={100}
                increment={100}
                initialDeg={90}
                overDeg={135}
                value={this.state.channel.pan.value}
                handleValueChange={this.handleValueChange}
                synthN={this.props.n}
              />
              <div className="left"></div>
              <div className="top"></div>
              <div className="right"></div>
              <div className="bottom"></div>
            </div>
            <Sequensor
              octave={this.state.octave}
              handleOctave={this.handleOctave}
              handleSequense={this.handleSequense}
              sequense={this.state.sequense}
              index={this.props.index}
            />
          </div>
          <SynthParams
            synth={this.state}
            handler={this.handleValueChange}
            synthHandler={this.handleSynthValueChange}
          />
        </div>
      </div>
    )
  }
}
