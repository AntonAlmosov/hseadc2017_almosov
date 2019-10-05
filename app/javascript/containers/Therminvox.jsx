import React from 'react'
import Tone from 'tone'

export default class Thereminvox extends React.Component {
  constructor(props) {
    super(props)

    const audioContext = new (window.AudioContext ||
      window.webkitAudioContext)()
    let oscillator = audioContext.createOscillator()
    oscillator.type = 'sine'

    let analyser = audioContext.createAnalyser()

    analyser = audioContext.createAnalyser()
    analyser.fftsize = 2048
    oscillator.connect(analyser)

    this.state = {
      audioContext: audioContext,
      oscillator: oscillator,
      analyser: analyser,
      playing: false,
      x: 0,
      y: 0,
      fftData: []
    }

    this.handleMouseMove = this.handleMouseMove.bind(this)
    this.handleStart = this.handleStart.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.handleStartOrStopClick = this.handleStartOrStopClick.bind(this)
    this.changeFrequency = this.changeFrequency.bind(this)
    this.changeDetune = this.changeDetune.bind(this)
    this.changeVisualization = this.changeVisualization.bind(this)
    this.handleSynthPlay = this.handleSynthPlay.bind(this)
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseMove(e) {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })

    this.changeFrequency()
    this.changeDetune()
    this.changeVisualization()
  }

  handleStartOrStopClick() {
    let { playing } = this.state
    if (playing) {
      this.handleStop()
    } else {
      this.handleStart()
    }
  }

  handleSynthPlay() {
    let synth = new Tone.Synth().toMaster()
    // synth.triggerAttackRelease('C4', '8n')

    var pattern = new Tone.Pattern(
      function(time, note) {
        synth.triggerAttackRelease(note, 0.25)
      },
      ['C6', 'D6', 'E6', 'G6', 'A6']
    )

    pattern.start(0)

    // var loop = new Tone.Loop(function(time) {
    //   synth.triggerAttackRelease('C2', '8n', time)
    // }, '4n')

    Tone.Transport.bpm.value = 220
    Tone.Transport.start()

    //create a distortion effect
    var distortion = new Tone.Distortion(0.4).toMaster()
    //connect a synth to the distortion
    synth.connect(distortion)
    //
    // loop.start('1m').stop('4m')
  }

  handleStart() {
    let { audioContext, oscillator, x, y, analyser } = this.state

    oscillator = audioContext.createOscillator()
    oscillator.type = 'sine'
    oscillator.frequency.setValueAtTime(x, audioContext.currentTime)
    oscillator.connect(audioContext.destination)
    oscillator.start()

    analyser = audioContext.createAnalyser()
    analyser.fftsize = 2048
    oscillator.connect(analyser)

    this.setState({
      oscillator: oscillator,
      analyser: analyser,
      playing: true
    })
  }

  handleStop() {
    let { oscillator } = this.state
    oscillator.stop()

    this.setState({
      oscillator: oscillator,
      playing: false
    })
  }

  changeFrequency() {
    let { audioContext, oscillator, x, y } = this.state
    oscillator.frequency.setValueAtTime(x, audioContext.currentTime)
  }

  changeDetune() {
    let { audioContext, oscillator, x, y } = this.state
    oscillator.detune.setValueAtTime(y, audioContext.currentTime)
  }

  changeVisualization() {
    const { analyser, playing } = this.state
    if (playing) {
      let bufferLength = analyser.frequencyBinCount
      let dataArray = new Uint8Array(bufferLength)
      analyser.getByteTimeDomainData(dataArray)

      this.setState({
        fftData: dataArray
      })
    }
  }

  render() {
    const { playing, analyser, fftData } = this.state
    let buttonText = '🎺 Start'

    if (playing) {
      buttonText = '🧢 Stop'
    }

    let elements = []

    if (fftData != undefined) {
      fftData.map(function(fftParam, i) {
        elements.push(
          <div className="analyser">
            <div
              key={i}
              className="analyserCol"
              style={{
                width: fftParam + 'px',
                background: '#000',
                height: '1px'
              }}
            />
          </div>
        )
      })
    }

    return (
      <div>
        <div onClick={this.handleSynthPlay}>Synth Play</div>
        <div onClick={this.handleStartOrStopClick}>{buttonText}</div>
        {elements}
      </div>
    )
  }
}
