import React from 'react'
import _ from 'lodash'

import MixerControlls from '../components/mixer/MixerControlls'
import MixerUnit from '../components/mixer/MixerUnit'
import KeyboradListener from '../components/synth/KeyboradListener'

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props)

    _.bindAll(
      this,
      'handleBpm',
      'handleGain',
      'handlePlay',
      'handleEQ',
      'handleVolume',
      'handleMuteCue',
      'handleRename'
    )
  }

  handleBpm(a, b, value) {
    this.props.handleBpmChange(value)
    this.setState({
      bpm: value
    })
  }

  handleGain(a, b, value) {
    this.props.handleGain(value)
    let res = value
    this.setState({
      gain: res
    })
  }

  handleRename(value, n) {
    this.props.handleNameChange(value, n)
  }

  handlePlay() {
    this.props.handlePlay()
  }

  handleMuteCue(type, value, n) {
    this.props.handleValueChange('channel', type, value, n)
    this.forceUpdate()
  }

  handleEQ(name, paramName, value, n) {
    this.props.handleValueChange(name, paramName, value, n)
  }

  handleVolume(value, n) {
    console.log(value)
    let volume = value / 100
    console.log(volume)
    this.props.handleValueChange('gain', 'gain', volume, n)
  }

  render() {
    return (
      <div className="mixerWrapper">
        <KeyboradListener
          synth={undefined}
          octave={undefined}
          handlePlay={this.handlePlay}
          changeView={this.props.changeView}
        />
        <MixerControlls
          handleBpm={this.handleBpm}
          bpm={this.props.bpm}
          gain={this.props.gain}
          handleGain={this.handleGain}
          handlePlay={this.handlePlay}
          playing={this.props.playing}
        />

        {this.props.synths.map((value, n) => {
          return (
            <MixerUnit
              playing={this.props.playing}
              meter={value.meter}
              name={value.name}
              changeView={this.props.changeView}
              key={n}
              n={n}
              eq={value.eq}
              handleEQ={this.handleEQ}
              volume={value.gain.gain.value * 100}
              handleVolume={this.handleVolume}
              muted={value.channel.muted}
              cued={value.channel.solo}
              handleMuteCue={this.handleMuteCue}
              handleRename={this.handleRename}
            />
          )
        })}
        <div className="createSynth" onClick={this.props.createSynth}></div>
      </div>
    )
  }
}
