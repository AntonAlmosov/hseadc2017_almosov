import _ from 'lodash'
import React from 'react'
import Tone from 'tone'

import Display from '../components/Display'
import Keyboard from '../components/Keyboard'
import KnobParam from '../components/KnobParam'
import StateButton from '../components/StateButton'
import SequensorTopControlls from '../components/SequensorTopControlls'
import SliderVertical from '../components/SliderVertical'
import ChorusPedal from '../components/ChorusPedal'
import Knob from '../components/Knob'
import DistortionPedal from '../components/DistortionPedal'
import PhaserPedal from '../components/PhaserPedal'

export default class Synthesizer extends React.Component {
  constructor(props) {
    super(props)

    Tone.Transport.bpm.value = 150

    //Declaring synths
    let pluckSynth = new Tone.PluckSynth()
    let membraneSynth = new Tone.MembraneSynth()
    let metalSynth = new Tone.AMSynth({
      oscillator: {
        type: 'square'
      },
      envelope: {
        attack: 0.46,
        decay: 0.78,
        sustain: 0.6,
        release: 1.5
      },
      portamento: 0.3
    })
    let synth = new Tone.Synth()

    //Declaring effects
    let volume = new Tone.Volume({
      volume: 0,
      mute: false
    })
    let chorus = new Tone.Chorus()
    chorus.wet.value = 0
    chorus.spread = 0
    let distortion = new Tone.Distortion()
    distortion.wet.value = 0
    let phaser = new Tone.Phaser()
    phaser.wet.value = 0

    synth.chain(volume, chorus, distortion, phaser, Tone.Master)
    pluckSynth.chain(volume, chorus, distortion, phaser, Tone.Master)
    membraneSynth.chain(volume, chorus, distortion, phaser, Tone.Master)
    metalSynth.chain(volume, chorus, distortion, phaser, Tone.Master)

    this.state = {
      bpm: 150,
      synth: synth,
      synthCollection: {
        active: 'pluck',
        pluck: pluckSynth,
        membrane: membraneSynth,
        metal: metalSynth,
        normal: synth
      },
      recording: false,
      sequence: [],
      playing: false,
      volume: {
        effect: volume,
        volume: 0,
        mute: false
      },
      chorus: chorus,
      distortion: distortion,
      phaser: phaser
    }
    this.handleSynthKeyPress = this.handleSynthKeyPress.bind(this)
    this.handleRecordKeyPress = this.handleRecordKeyPress.bind(this)
    this.handleStartKeyPress = this.handleStartKeyPress.bind(this)
    this.changeEffectVolume = this.changeEffectVolume.bind(this)
    this.changeEffectBpm = this.changeEffectBpm.bind(this)
    this.handleSynthSwitch = this.handleSynthSwitch.bind(this)
    this.changeEffect = this.changeEffect.bind(this)
  }

  changeEffectVolume(effectName, value) {
    let { effect, volume, mute } = this.state[effectName]
    effect.volume.value = value
    volume = value
    this.setState({
      [`${effectName}`]: {
        effect,
        volume,
        mute
      }
    })
  }

  changeEffect(effectName, paramName, increment, value) {
    let effect = this.state[effectName]
    if (
      paramName == 'wet' ||
      (effectName == 'chorus') & (paramName == 'frequency')
    ) {
      effect[`${paramName}`].value = value / increment
    } else if (paramName == 'type' || paramName == 'oversample') {
      effect[`${paramName}`] = value
    } else {
      effect[`${paramName}`] = value / increment
    }
  }

  changeEffectBpm(effectName, value) {
    Tone.Transport.bpm.value = value

    this.setState({
      bpm: value
    })
  }

  handleSynthKeyPress(key) {
    if (this.state.recording) {
      let arr = this.state.sequence
      this.state.synth.triggerAttackRelease(key, '8n').toMaster()
      if (this.state.sequence.length < 8) {
        arr.push(key)
        this.setState({
          sequence: arr
        })
      } else {
        arr.shift()
        arr.push(key)
        this.setState({
          sequence: arr
        })
      }
    } else {
      this.state.synth.triggerAttackRelease(key, '8n').toMaster
    }
  }

  handleRecordKeyPress() {
    if (this.state.recording) {
      this.setState({
        recording: !this.state.recording
      })
    } else {
      this.setState({
        recording: !this.state.recording,
        playing: false,
        sequence: [],
        sequenceCounter: 0
      })
      Tone.Transport.cancel()
    }
  }

  handleSynthSwitch(type) {
    Tone.Transport.cancel()
    this.setState({
      recording: false,
      playing: false,
      synth: this.state.synthCollection[type]
    })
  }

  handleStartKeyPress() {
    let synth = this.state.synth
    if (this.state.playing) {
      Tone.Transport.cancel()
      this.setState({
        playing: !this.state.playing
      })
    } else {
      this.setState({
        recording: false,
        playing: !this.state.playing
      })
      var sequence = new Tone.Sequence(
        function(time, note) {
          synth.triggerAttackRelease(note, '8n', time)
        },
        this.state.sequence,
        '8n'
      )
      Tone.Transport.start()
      sequence.start()
    }
  }

  render() {
    let volume = this.state.volume.effect
    return (
      <div className="appContainer">
        <SequensorTopControlls
          volumeValue={volume.volume.value}
          handleVolumeChange={this.changeEffectVolume}
          bpmValue={Tone.Transport.bpm.value}
          handleBpmChange={this.changeEffectBpm}
          handleSynthSwitch={this.handleSynthSwitch}
          synth={this.state.synth}
        />
        <div className="sequensorBody">
          <Keyboard handleClick={this.handleSynthKeyPress} />
          <div className="sequensorControllsContainer">
            <StateButton
              clickHandler={this.handleRecordKeyPress}
              active={this.state.recording}
              textTrue="Recording"
              textFalse="Record"
              cssTrue="recording"
              cssFalse="record"
            />
            <StateButton
              clickHandler={this.handleStartKeyPress}
              active={this.state.playing}
              textTrue="Playing"
              textFalse="Play"
              cssTrue="playing"
              cssFalse="play"
            />
          </div>
        </div>
        <div className="sequensorPedals">
          <ChorusPedal handler={this.changeEffect} value={this.state.chorus} />
          <DistortionPedal
            handler={this.changeEffect}
            value={this.state.distortion}
          />
          <PhaserPedal handler={this.changeEffect} value={this.state.phaser} />
        </div>
      </div>
    )
  }
}
