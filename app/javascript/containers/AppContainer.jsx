import React from 'react'
import _ from 'lodash'
import Tone from 'tone'

import Mixer from './Mixer'
import Synth from './Synth'

export default class AppContainer extends React.Component {
  constructor(props) {
    super(props)

    let gain = new Tone.Gain(0.5)
    Tone.Master.chain(gain)
    this.state = {
      inView: 'mixer',
      index: false,
      synths: [],
      gain: gain,
      bpm: 140,
      playing: false,
      loop: {}
    }

    Tone.Transport.bpm.value = this.state.bpm

    _.bindAll(
      this,
      'changeView',
      'createSynth',
      'handleValueChange',
      'handleGainChange',
      'handlePlay',
      'handleNameChange',
      'handleBpmChange',
      'handleSynthChange',
      'handleOctaveChange',
      'handleSequense',
      'handleSynthValueChange'
    )
  }

  componentDidMount() {
    this.createSynth()
  }

  handleSynthChange(value, n) {
    let synths = this.state.synths
    if (value == 'Synth') {
      synths[n].synth = synths[n].synthCollection.synth
    }
    if (value == 'MembraneSynth') {
      synths[n].synth = synths[n].synthCollection.drum
    }
    if (value == 'PluckSynth') {
      synths[n].synth = synths[n].synthCollection.pluck
    }
    console.log(this.state.synths[n].synth)
  }

  handleOctaveChange(value, n) {
    let synth = this.state.synths[n]
    synth.octave = value
  }

  handleValueChange(name, param, value, n, optionalName) {
    if (optionalName) {
      let synths = this.state.synths
      if (typeof synths[n][optionalName][name][`${param}`] == 'object') {
        synths[n][optionalName][name][`${param}`].value = value
      } else {
        synths[n][optionalName][name][`${param}`] = value
      }
    } else {
      let synths = this.state.synths
      if (typeof synths[n][name][`${param}`] == 'object') {
        synths[n][name][`${param}`].value = value
      } else {
        synths[n][name][`${param}`] = value
      }
    }
  }
  handleSynthValueChange(name, param, value, n) {
    console.log(value)
    let synth = this.state.synths[n].synth
    if (typeof synth[name][`${param}`] == 'object') {
      synth[name][`${param}`].value = value
    } else {
      synth[name][`${param}`] = value
    }
  }

  handleNameChange(name, n) {
    let synth = this.state.synths[n]
    synth.name = name
  }

  handleGainChange(value) {
    let gain = this.state.gain
    gain.gain.value = value
    this.setState({
      gain: gain
    })
  }

  handleBpmChange(value) {
    Tone.Transport.bpm.value = value
    console.log(Tone.Transport.bpm.value)
    this.setState({
      bpm: value
    })
  }

  createSynth() {
    let synth = new Tone.Synth()
    let drum = new Tone.MembraneSynth()
    let pluck = new Tone.PluckSynth()
    pluck.attackNoise = 20

    let meter = new Tone.Meter()
    let gain = new Tone.Gain(1)
    let eq = new Tone.EQ3(0, 0, 0)
    eq.wet = 1
    let channel = new Tone.Channel()
    let autofilter = new Tone.AutoFilter()
    let autopanner = new Tone.AutoPanner()
    let autowah = new Tone.AutoWah()
    let bitcrusher = new Tone.BitCrusher()
    let chebyshev = new Tone.Chebyshev()
    let chrorus = new Tone.Chorus()
    let convolver = new Tone.Convolver()
    let distortion = new Tone.Distortion()
    let feedbackdelay = new Tone.FeedbackDelay()
    let freeverb = new Tone.Freeverb()
    let jscreverb = new Tone.JCReverb()
    let phaser = new Tone.Phaser()
    let pingpong = new Tone.PingPongDelay()
    let pitchshift = new Tone.PitchShift()
    let reverb = new Tone.Reverb()
    let tremolo = new Tone.Tremolo()
    let vibrato = new Tone.Vibrato()
    synth.chain(
      autofilter,
      autopanner,
      autowah,
      bitcrusher,
      chebyshev,
      chrorus,
      convolver,
      distortion,
      feedbackdelay,
      freeverb,
      jscreverb,
      phaser,
      pingpong,
      pitchshift,
      reverb,
      tremolo,
      vibrato,
      meter,
      eq,
      gain,
      channel,
      Tone.Master
    )
    drum.chain(
      autofilter,
      autopanner,
      autowah,
      bitcrusher,
      chebyshev,
      chrorus,
      convolver,
      distortion,
      feedbackdelay,
      freeverb,
      jscreverb,
      phaser,
      pingpong,
      pitchshift,
      reverb,
      tremolo,
      vibrato,
      meter,
      eq,
      gain,
      channel,
      Tone.Master
    )
    pluck.chain(
      autofilter,
      autopanner,
      autowah,
      bitcrusher,
      chebyshev,
      chrorus,
      convolver,
      distortion,
      feedbackdelay,
      freeverb,
      jscreverb,
      phaser,
      pingpong,
      pitchshift,
      reverb,
      tremolo,
      vibrato,
      meter,
      eq,
      gain,
      channel,
      Tone.Master
    )

    console.log(eq)
    let stateSynths = this.state.synths
    stateSynths.push({
      name: 'Tone',
      octave: 4,
      sequense: [
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        [],
        []
      ],
      synth: synth,
      meter: meter,
      synthCollection: {
        currentSynth: 'synth',
        synth: synth,
        drum: drum,
        pluck: pluck
      },
      eq: eq,
      gain: gain,
      channel: channel,
      autofilter: autofilter,
      autopanner: autopanner,
      autowah: autowah,
      bitcrusher: bitcrusher,
      chebyshev: chebyshev,
      chrorus: chrorus,
      convolver: convolver,
      distortion: distortion,
      feedbackdelay: feedbackdelay,
      freeverb: freeverb,
      jscreverb: jscreverb,
      phaser: phaser,
      pingpong: pingpong,
      pitchshift: pitchshift,
      reverb: reverb,
      tremolo: tremolo,
      vibrato: vibrato
    })
    this.setState({
      synths: stateSynths
    })
  }

  handlePlay() {
    let index = 0
    if (this.state.playing) {
      Tone.Transport.cancel()
      this.setState({
        index: false
      })
    } else {
      Tone.Transport.start()
      Tone.Transport.scheduleRepeat(time => {
        for (let synthN = 0; synthN < this.state.synths.length; synthN++) {
          let synth = this.state.synths[synthN]
          // if (synth.sequense[index].length != 0) {
          //   let part = new Tone.Part(function(time, note) {
          //     console.log(note)
          //   }, synth.sequense[index])
          //   part.start(0)
          //   part.loop = true
          //   part.loopEnd = '1n'
          // }
          synth.sequense[index].map(val => {
            synth.synth.triggerAttackRelease(val, '16n').toMaster()
          })
        }
        if (index < 16) index++
        if (index == 16) index = 0
        this.setState({
          index: index
        })
      }, '16n')
    }
    this.setState({
      playing: !this.state.playing
    })
  }

  handleSequense(newSequense, n) {
    let synth = this.state.synths[n]
    synth.sequense = newSequense
    console.log(this.state.synths[n].sequense)
  }

  changeView(value) {
    if (value == 'prev') {
      if (this.state.inView == 0) {
        this.setState({
          inView: 'mixer'
        })
        this.forceUpdate()
      } else if (this.state.inView == 'mixer') {
        this.setState({
          inView: this.state.synths.length - 1
        })
        this.forceUpdate()
      } else if (this.state.inView > 0) {
        let inView = this.state.inView
        this.setState({
          inView: inView - 1
        })
        this.forceUpdate()
      }
    } else if (value == 'next') {
      if (this.state.inView == this.state.synths.length - 1) {
        this.setState({
          inView: 'mixer'
        })
        this.forceUpdate()
      } else if (this.state.inView == 'mixer') {
        this.setState({
          inView: 0
        })
        this.forceUpdate()
      } else if (this.state.inView < this.state.synths.length - 1) {
        let inView = this.state.inView
        this.setState({
          inView: inView + 1
        })
        this.forceUpdate()
      }
    } else {
      this.setState({
        inView: value
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.inView == 'mixer' && (
          <Mixer
            changeView={this.changeView}
            synths={this.state.synths}
            createSynth={this.createSynth}
            gain={this.state.gain.gain.value}
            bpm={this.state.bpm}
            handleBpmChange={this.handleBpmChange}
            handleValueChange={this.handleValueChange}
            handleGain={this.handleGainChange}
            playing={this.state.playing}
            handlePlay={this.handlePlay}
            handleNameChange={this.handleNameChange}
          />
        )}
        {this.state.inView != 'mixer' && (
          <Synth
            changeView={this.changeView}
            n={this.state.inView}
            value={this.state.synths[this.state.inView]}
            handleSynthChange={this.handleSynthChange}
            handleOctave={this.handleOctaveChange}
            handlePlay={this.handlePlay}
            handleSequense={this.handleSequense}
            index={this.state.index}
            handleValueChange={this.handleValueChange}
            handleSynthValueChange={this.handleSynthValueChange}
            handleRename={this.handleNameChange}
          />
        )}
      </div>
    )
  }
}
