import _ from 'lodash'
import React from 'react'
import Tone from 'tone'

import Keyboard from '../components/old/Keyboard'
import StateButton from '../components/old/StateButton'
import SequensorTopControlls from '../components/old/SequensorTopControlls'
import ChorusPedal from '../components/old/ChorusPedal'
import DistortionPedal from '../components/old/DistortionPedal'
import PhaserPedal from '../components/old/PhaserPedal'
import SequensorControlls from '../old/components/SequensorControlls'
import SynthParams from '../components/old/SynthParams'

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
    let volume = new Tone.PanVol()
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
      octave: 4,
      bpm: 150,
      noteLength: '8n',
      sequenseNoteLength: '4n',
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
      volume: volume,
      chorus: chorus,
      distortion: distortion,
      phaser: phaser
    }
    this.handleSynthKeyPress = this.handleSynthKeyPress.bind(this)
    this.handleRecordKeyPress = this.handleRecordKeyPress.bind(this)
    this.handleStartKeyPress = this.handleStartKeyPress.bind(this)
    this.changeEffectBpm = this.changeEffectBpm.bind(this)
    this.handleSynthSwitch = this.handleSynthSwitch.bind(this)
    this.changeEffect = this.changeEffect.bind(this)
    this.changeOctave = this.changeOctave.bind(this)
    this.changeNoteLength = this.changeNoteLength.bind(this)
    this.startSequense = this.startSequense.bind(this)
    this.changeSynthEffect = this.changeSynthEffect.bind(this)
  }

  changeEffect(effectName, paramName, increment, value) {
    let effect = this.state[effectName]
    if (typeof effect[`${paramName}`] == 'object') {
      effect[`${paramName}`].value = value / increment
    } else if (typeof effect[`${paramName}`] == 'string') {
      effect[`${paramName}`] = value
    } else {
      effect[`${paramName}`] = value / increment
    }
  }

  changeSynthEffect(effectName, paramName, increment, value) {
    let effect = this.state.synth[effectName]
    if (typeof effect[`${paramName}`] == 'object') {
      effect[`${paramName}`].value = value / increment
    } else if (typeof effect[`${paramName}`] == 'string') {
      effect[`${paramName}`] = value
    } else {
      effect[`${paramName}`] = value / increment
    }
  }

  changeOctave(value) {
    this.setState({
      octave: value
    })
  }

  changeEffectBpm(effectName, value) {
    Tone.Transport.bpm.value = value

    this.setState({
      bpm: value
    })
  }

  changeNoteLength(inChange, length) {
    this.setState({
      [`${inChange}`]: length,
      playing: false
    })
    Tone.Transport.cancel()
  }

  startSequense() {
    let synth = this.state.synth
    var sequence = new Tone.Sequence(
      function(time, note) {
        synth.triggerAttackRelease(note, '8n', time)
      },
      this.state.sequence,
      this.state.sequenseNoteLength
    )
    Tone.Transport.start()
    sequence.start()
  }

  handleSynthKeyPress(key) {
    let synth = this.state.synth

    if (this.state.recording) {
      let arr = this.state.sequence
      synth.triggerAttackRelease(key, this.state.noteLength)
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
      synth.triggerAttackRelease(key, this.state.noteLength)
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
      this.startSequense()
    }
  }

  render() {
    return (
      <div className={this.props.inView ? 'appContainer' : 'appContainer none'}>
        <div className="row">
          <div className="synthBody">
            <SequensorTopControlls
              volumeValue={this.state.volume}
              handleVolumeChange={this.changeEffect}
              bpmValue={Tone.Transport.bpm.value}
              handleBpmChange={this.changeEffectBpm}
              handleSynthSwitch={this.handleSynthSwitch}
              octave={this.state.octave}
              octaveHandler={this.changeOctave}
              synth={this.state.synth}
              handleNoteLength={this.changeNoteLength}
              sequenseNoteLength={this.state.sequenseNoteLength}
            />
            <div className="sequensorBody">
              <Keyboard
                handleClick={this.handleSynthKeyPress}
                octave={this.state.octave}
              />
              <SequensorControlls
                handleRecordKeyPress={this.handleRecordKeyPress}
                handleStartKeyPress={this.handleStartKeyPress}
                recording={this.state.recording}
                playing={this.state.playing}
              />
            </div>
          </div>
          <SynthParams
            subHandler={this.changeSynthEffect}
            handler={this.changeEffect}
            value={this.state.synth}
          />
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
