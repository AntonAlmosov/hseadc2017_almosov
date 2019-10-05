import React from 'react'
import Tone from 'tone'

export default class Synth extends React.Component {
  constructor(props) {
    super(props)

    let autoFilter = new Tone.AutoFilter({
      frequency: 1,
      type: 'sine',
      depth: 1,
      baseFrequency: 1000,
      octaves: 2.6,
      filter: {
        type: 'lowpass',
        rolloff: -12,
        Q: 1
      }
    })

    let feedbackDelay = new Tone.FeedbackDelay({
      delayTime: '32n',
      maxDelay: 10
    })

    let tremolo = new Tone.Tremolo({
      frequency: 3,
      type: 'sine',
      depth: 2,
      spread: 180
    })

    let distortion = new Tone.Distortion({
      distortion: 1,
      oversample: '4x'
    })

    let autoPanner = new Tone.AutoPanner({
      frequency: 1,
      type: 'sine',
      depth: 1
    })

    let autoWah = new Tone.AutoWah({
      baseFrequency: 100,
      octaves: 6,
      sensitivity: 0,
      Q: 2,
      gain: 2,
      follower: {
        attack: 0.3,
        release: 0.5
      }
    })

    let bitCrusher = new Tone.BitCrusher({
      bits: 4
    })

    let chebyshev = new Tone.Chebyshev({
      order: 50,
      oversample: 'none'
    })

    let chorus = new Tone.Chorus({
      frequency: 1.5,
      delayTime: 3.5,
      depth: 0.7,
      type: 'sine',
      spread: 180
    })

    let convolver = new Tone.Convolver({
      onload: Tone.noOp,
      normalize: true
    })

    let effect = new Tone.Effect({
      wet: 1
    })

    let feedbackEffect = new Tone.FeedbackEffect({
      feedback: 0.125
    })

    let freeverb = new Tone.Freeverb({
      roomSize: 0.7,
      dampening: 3000
    })

    let jcReverb = new Tone.JCReverb({
      roomSize: 0.5
    })

    let phaser = new Tone.Phaser({
      frequency: 0.5,
      octaves: 3,
      stages: 10,
      Q: 10,
      baseFrequency: 350
    })

    let pingPongDelay = new Tone.PingPongDelay({
      delayTime: 0.25,
      maxDelayTime: 1
    })

    let pitchShift = new Tone.PitchShift({
      pitch: 0,
      windowSize: 0.1,
      delayTime: 0,
      feedback: 0
    })

    let reverb = new Tone.Reverb({
      decay: 1.5,
      preDelay: 0.01
    })

    let stereoWidener = new Tone.StereoWidener({
      width: 0.5
    })

    let vibrato = new Tone.Vibrato({
      maxDelay: 0.005,
      frequency: 5,
      depth: 0.1,
      type: 'sine'
    })

    this.state = {
      autoFilter: autoFilter,
      autoFilterIsOn: false,
      feedbackDelay: feedbackDelay,
      feedbackDelayIsOn: false,
      tremolo: tremolo,
      tremoloIsOn: false,
      distortion: distortion,
      distortionIsOn: false,
      autoPanner: autoPanner,
      autoPannerIsOn: false,
      autoWah: autoWah,
      autoWahIsOn: false,
      bitCrusher: bitCrusher,
      bitCrusherIsOn: false,
      chebyshev: chebyshev,
      chebyshevIsOn: false,
      chorus: chorus,
      chorusIsOn: false,
      convolver: convolver,
      convolverIsOn: false,
      effect: effect,
      effectIsOn: false,
      feedbackEffect: feedbackEffect,
      feedbackEffectIsOn: false,
      freeverb: freeverb,
      freeverbIsOn: false,
      jcReverb: jcReverb,
      jcReverbIsOn: false,
      phaser: phaser,
      phaserIsOn: false,
      pingPongDelay: pingPongDelay,
      pingPongDelayIsOn: false,
      pitchShift: pitchShift,
      pitchShiftIsOn: false,
      reverb: reverb,
      reverbIsOn: false,
      stereoWidener: stereoWidener,
      stereoWidenerIsOn: false,
      vibrato: vibrato,
      vibratoIsOn: false
    }


    this.strigify = this.strigify.bind(this)
    this.startSynth = this.startSynth.bind(this)
    this.toggleFilter = this.toggleFilter.bind(this)
    this.toggleFeedbackDelay = this.toggleFeedbackDelay.bind(this)
    this.toggleTremolo = this.toggleTremolo.bind(this)
    this.toggleDistortion = this.toggleDistortion.bind(this)
    this.toggleAutoPanner = this.toggleAutoPanner.bind(this)
    this.toggleAutoWah = this.toggleAutoWah.bind(this)
    this.toggleBitCrusher = this.toggleBitCrusher.bind(this)
    this.toggleChebyshev = this.toggleChebyshev.bind(this)
    this.toggleChorus = this.toggleChorus.bind(this)
    this.toggleConvolver = this.toggleConvolver.bind(this)
    this.toggleEffect = this.toggleEffect.bind(this)
    this.toggleFeedbackEffect = this.toggleFeedbackEffect.bind(this)
    this.toggleFreeverb = this.toggleFreeverb.bind(this)
    this.toggleJcReverb = this.toggleJcReverb.bind(this)
    this.togglePhaser = this.togglePhaser.bind(this)
    this.togglePingPongDelay = this.togglePingPongDelay.bind(this)
    this.togglePitchShift = this.togglePitchShift.bind(this)
    this.toggleReverb = this.toggleReverb.bind(this)
    this.toggleStereoWidener = this.toggleStereoWidener.bind(this)
    this.toggleVibrato = this.toggleVibrato.bind(this)
  }

  startSynth() {
    console.log('Started')

    let synth = new Tone.Synth().toMaster()
    synth.chain(
      this.state.autoFilter,
      this.state.feedbackDelay,
      this.state.tremolo,
      this.state.distortion,
      this.state.autoPanner,
      this.state.autoWah,
      this.state.bitCrusher,
      this.state.chebyshev,
      this.state.chorus,
      this.state.convolver,
      this.state.effect,
      this.state.feedbackEffect,
      this.state.freeverb,
      this.state.jcReverb,
      this.state.phaser,
      this.state.pingPongDelay,
      this.state.pitchShift,
      this.state.reverb,
      this.state.stereoWidener,
      this.state.vibrato,
      Tone.Master
    )

    this.setState({
      synth: synth
    })

    let loop = new Tone.Loop(function(time) {
      synth.triggerAttackRelease('C2', '8sn', time)
    }, '4n')

    loop.start('0m').stop('16m')
    Tone.Transport.bpm.value = 115
    Tone.Transport.start()
  }

  toggleFilter() {
    if (this.state.autoFilterIsOn) {
      this.state.autoFilter.wet.value = 0
    } else {
      this.state.autoFilter.wet.value = 1
    }

    this.setState({
      autoFilterIsOn: !this.state.autoFilterIsOn
    })
  }

  strigify(str){
    console.log(str)
  }

  toggler(a,b){
    if (this.state.feedbackDelayIsOn) {
      this.state.feedbackDelay.wet.value = 0
    } else {
      this.state.feedbackDelay.wet.value = 1
    }

    this.setState({
      feedbackDelayIsOn: !this.state.feedbackDelayIsOn
    })
  }

  toggleFeedbackDelay() {
    if (this.state.feedbackDelayIsOn) {
      this.state.feedbackDelay.wet.value = 0
    } else {
      this.state.feedbackDelay.wet.value = 1
    }

    this.setState({
      feedbackDelayIsOn: !this.state.feedbackDelayIsOn
    })
  }

  toggleTremolo() {
    if (this.state.tremoloIsOn) {
      this.state.tremolo.wet.value = 0
    } else {
      this.state.tremolo.wet.value = 1
    }

    this.setState({
      tremoloIsOn: !this.state.tremoloIsOn
    })
  }

  toggleDistortion() {
    if (this.state.distortionIsOn) {
      this.state.distortion.wet.value = 0
    } else {
      this.state.distortion.wet.value = 1
    }

    this.setState({
      distortionIsOn: !this.state.distortionIsOn
    })
  }

  toggleAutoPanner() {
    if (this.state.autoPannerIsOn) {
      this.state.autoPanner.wet.value = 0
    } else {
      this.state.autoPanner.wet.value = 1
    }

    this.setState({
      autoPannerIsOn: !this.state.autoPannerIsOn
    })
  }

  toggleAutoWah() {
    if (this.state.autoWahIsOn) {
      this.state.autoWah.wet.value = 0
    } else {
      this.state.autoWah.wet.value = 1
    }

    this.setState({
      autoWahIsOn: !this.state.autoWahIsOn
    })
  }

  toggleBitCrusher() {
    if (this.state.bitCrusherIsOn) {
      this.state.bitCrusher.wet.value = 0
    } else {
      this.state.bitCrusher.wet.value = 1
    }

    this.setState({
      bitCrusherIsOn: !this.state.bitCrusherIsOn
    })
  }

  toggleChebyshev() {
    if (this.state.chebyshevIsOn) {
      this.state.chebyshev.wet.value = 0
    } else {
      this.state.chebyshev.wet.value = 1
    }

    this.setState({
      chebyshevIsOn: !this.state.chebyshevIsOn
    })
  }

  toggleChorus() {
    if (this.state.chorusIsOn) {
      this.state.chorus.wet.value = 0
    } else {
      this.state.chorus.wet.value = 1
    }

    this.setState({
      chorusIsOn: !this.state.chorusIsOn
    })
  }

  toggleConvolver() {
    if (this.state.convolverIsOn) {
      this.state.convolver.wet.value = 0
    } else {
      this.state.convolver.wet.value = 1
    }

    this.setState({
      convolverIsOn: !this.state.convolverIsOn
    })
  }

  toggleEffect() {
    if (this.state.effectIsOn) {
      this.state.effect.wet.value = 0
    } else {
      this.state.effect.wet.value = 1
    }

    this.setState({
      effectIsOn: !this.state.effectIsOn
    })
  }

  toggleFeedbackEffect() {
    if (this.state.feedbackEffectIsOn) {
      this.state.feedbackEffect.wet.value = 0
    } else {
      this.state.feedbackEffect.wet.value = 1
    }

    this.setState({
      feedbackEffectIsOn: !this.state.feedbackEffectIsOn
    })
  }

  toggleFreeverb() {
    if (this.state.freeverbIsOn) {
      this.state.freeverb.wet.value = 0
    } else {
      this.state.freeverb.wet.value = 1
    }

    this.setState({
      freeverbIsOn: !this.state.freeverbIsOn
    })
  }

  toggleJcReverb() {
    if (this.state.jcReverbbIsOn) {
      this.state.jcReverb.wet.value = 0
    } else {
      this.state.jcReverb.wet.value = 1
    }

    this.setState({
      jcReverbbIsOn: !this.state.jcReverbbIsOn
    })
  }

  togglePhaser() {
    if (this.state.phaserIsOn) {
      this.state.phaser.wet.value = 0
    } else {
      this.state.phaser.wet.value = 1
    }

    this.setState({
      phaserIsOn: !this.state.phaserIsOn
    })
  }

  togglePingPongDelay() {
    if (this.state.pingPongDelayIsOn) {
      this.state.pingPongDelay.wet.value = 0
    } else {
      this.state.pingPongDelay.wet.value = 1
    }

    this.setState({
      pingPongDelayIsOn: !this.state.pingPongDelayIsOn
    })
  }

  togglePitchShift() {
    if (this.state.pitchShiftIsOn) {
      this.state.pitchShift.wet.value = 0
    } else {
      this.state.pitchShift.wet.value = 1
    }

    this.setState({
      pitchShiftIsOn: !this.state.pitchShiftIsOn
    })
  }

  toggleReverb() {
    if (this.state.reverbIsOn) {
      this.state.reverb.wet.value = 0
    } else {
      this.state.reverb.wet.value = 1
    }

    this.setState({
      reverbIsOn: !this.state.reverbIsOn
    })
  }

  toggleStereoWidener() {
    if (this.state.stereoWidenerIsOn) {
      this.state.stereoWidener.wet.value = 0
    } else {
      this.state.stereoWidener.wet.value = 1
    }

    this.setState({
      stereoWidenerIsOn: !this.state.stereoWidenerIsOn
    })
  }

  toggleVibrato() {
    if (this.state.vibratoIsOn) {
      this.state.vibrato.wet.value = 0
    } else {
      this.state.vibrato.wet.value = 1
    }

    this.setState({
      vibratoIsOn: !this.state.vibratoIsOn
    })
  }


  render() {
    return (
      <div className="container">
        <div onClick={this.strigify('sad')} className="button">
          Start Synth
        </div>
        <div onClick={this.toggleFilter} className="button">
          Toggle Filter ({this.state.autoFilterIsOn.toString()})
        </div>
        <div onClick={this.toggleFeedbackDelay} className="button">
          Toggle Feedback Delay ({this.state.feedbackDelayIsOn.toString()})
        </div>
        <div onClick={this.toggleTremolo} className="button">
          Toggle Tremolo ({this.state.tremoloIsOn.toString()})
        </div>
        <div onClick={this.toggleDistortion} className="button">
          Toggle Distortion ({this.state.distortionIsOn.toString()})
        </div>
        <div onClick={this.toggleAutoPanner} className="button">
          Toggle Auto Panner ({this.state.autoPannerIsOn.toString()})
        </div>
        <div onClick={this.toggleAutoWah} className="button">
          Toggle Auto Wah ({this.state.autoWahIsOn.toString()})
        </div>
        <div onClick={this.toggleBitCrusher} className="button">
          Toggle Bit Crusher ({this.state.bitCrusherIsOn.toString()})
        </div>
        <div onClick={this.toggleChebyshev} className="button">
          Toggle Chebyshev ({this.state.chebyshevIsOn.toString()})
        </div>
        <div onClick={this.toggleChorus} className="button">
          Toggle Chorus ({this.state.chorusIsOn.toString()})
        </div>
        <div onClick={this.toggleConvolver} className="button">
          Toggle Convolver ({this.state.convolverIsOn.toString()})
        </div>
        <div onClick={this.toggleEffect} className="button">
          Toggle Effect ({this.state.effectIsOn.toString()})
        </div>
        {/* <div onClick={this.toggleFeedbackEffect} className="button">
          Toggle Feedback Effect ({this.state.feedbackEffectIsOn.toString()})
        </div>
        <div onClick={this.toggleFreeverb} className="button">
          Toggle Freeverb ({this.state.freeverbIsOn.toString()})
        </div>
        <div onClick={this.toggleJcReverb} className="button">
          Toggle Jc Reverb ({this.state.jcReverbIsOn.toString()})
        </div>
        <div onClick={this.togglePhaser} className="button">
          Toggle Phaser ({this.state.phaserIsOn.toString()})
        </div>
        <div onClick={this.togglePingPongDelay} className="button">
          Toggle Ping Pong Delay ({this.state.pingPongDelayIsOn.toString()})
        </div>
        <div onClick={this.togglePitchShift} className="button">
          Toggle Pitch Shift ({this.state.pitchShiftIsOn.toString()})
        </div>
        <div onClick={this.toggleReverb} className="button">
          Toggle Reverb ({this.state.reverbIsOn.toString()})
        </div>
        <div onClick={this.toggleStereoWidener} className="button">
          Toggle Stereo Widener ({this.state.stereoWidenerIsOn.toString()})
        </div>
        <div onClick={this.toggleVibrato} className="button">
          Toggle Vibrato ({this.state.vibratoIsOn.toString()})
        </div> */}
      </div>
    )
  }
}
