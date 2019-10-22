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
import Effects from '../components/effects/Effects'

export default class Synth extends React.Component {
  constructor(props) {
    super(props)
    // this.state = this.props.value

    _.bindAll(
      this,
      'handleSynthChange',
      'handleSwitch',
      'handleOctave',
      'handleSequense',
      'handleSolo',
      'handleValueChange',
      'handleRename',
      'handleSynthValueChange',
      'handleSubValueChange',
      'handleEffectConnect'
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
    let solo = !this.props.value.channel.solo
    this.props.handleValueChange('channel', 'solo', solo, this.props.n)
    this.forceUpdate()
  }
  handleValueChange(name, param, value) {
    console.log(value)
    this.props.handleValueChange(name, param, value, this.props.n)
    this.forceUpdate()
  }
  handleSubValueChange(name, param, inner, value) {
    this.props.handleSubValueChange(name, param, inner, value, this.props.n)
    this.forceUpdate()
  }
  handleSynthValueChange(name, param, value) {
    this.props.handleSynthValueChange(name, param, value, this.props.n)
    this.forceUpdate()
  }

  handleEffectConnect(effect) {
    this.props.handleEffectConnect(effect, this.props.n)
  }

  render() {
    return (
      <div className="Synth">
        <KeyboradListener
          synth={this.props.value.synth}
          octave={this.props.value.octave}
          handlePlay={this.props.handlePlay}
          changeView={this.handleSwitch}
        />
        <div className="row">
          <div className="sequensorControllsWrapper">
            <div className="sequensorTopControlls">
              <CloseButton handler={this.props.changeView} />
              <SynthButton
                name={this.props.value.name}
                nameHandler={this.handleRename}
              />
              <ToggleButton
                isTrue={this.props.value.channel.solo}
                handler={this.handleSolo}
                customClass="yellow"
                text={'CUE'}
              />
              <Picker
                current={this.props.value.synth}
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
                value={this.props.value.channel.volume.value}
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
                value={this.props.value.channel.pan.value}
                handleValueChange={this.handleValueChange}
                synthN={this.props.n}
              />
              <div className="left"></div>
              <div className="top"></div>
              <div className="right"></div>
              <div className="bottom"></div>
            </div>
            <Sequensor
              octave={this.props.value.octave}
              handleOctave={this.handleOctave}
              handleSequense={this.handleSequense}
              sequense={this.props.value.sequense}
              index={this.props.index}
            />
          </div>
          <SynthParams
            synth={this.props.value}
            handler={this.handleValueChange}
            synthHandler={this.handleSynthValueChange}
          />
        </div>
        <Effects
          synth={this.props.value}
          handler={this.handleValueChange}
          subHandler={this.handleSubValueChange}
          handleConnect={this.handleEffectConnect}
        />
      </div>
    )
  }
}
