import _ from 'lodash'
import React from 'react'

import MixerEQ from './MixerEQ'
import ReactSlider from 'react-slider'
import SliderVertical from '../controlls/SliderVertical'
import MuteCueButton from '../controlls/MuteCueButton'

export default class MixerUnit extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      cued: false,
      muted: false
    }
    _.bindAll(this, 'handleVolume', 'handleMute', 'handleCue', 'handleMeter')
  }

  handleVolume(value) {
    this.props.handleVolume(value, this.props.n)
  }

  handleMute() {
    this.props.handleMuteCue('mute', !this.props.muted, this.props.n)
  }
  handleCue() {
    this.props.handleMuteCue('solo', !this.props.cued, this.props.n)
  }
  handleRename(e) {
    this.props.handleRename(e.target.value, this.props.n)
  }

  handleMeter() {
    this.props.meter.smoothing = 0.4
    let meter = 0
    if (!this.props.playing) meter = 0
    else {
      meter = this.props.meter.getLevel()
      meter = (100 - -meter) * 2.5
    }
    return <div className="meter" style={{ height: meter }}></div>
  }

  render() {
    return (
      <div className="mixerUnit col">
        <div className="mixerUnitHeader">
          <input
            defaultValue={this.props.name}
            onChange={this.handleRename.bind(this)}
          />
          <div
            onClick={() => this.props.changeView(this.props.n)}
            className="mixerUnitArrow"
          ></div>
        </div>
        <MixerEQ
          handleEQ={this.props.handleEQ}
          eq={this.props.eq}
          n={this.props.n}
        />
        {/* <SliderVertical
        name="synth"
        property="volume"
        min="0"
        max="100"
        on={true}
        value={volume}
        n={n}
        handleValueChange={handleVolume}
      /> */}
        <div className="SliderVerticalWrapper">
          {this.handleMeter()}
          <ReactSlider
            className="Slider"
            thumbClassName="thumb"
            defaultValue={this.props.volume}
            ariaLabel={'Volume'}
            renderThumb={(props, state) => (
              <div {...props}>{state.valueNow}</div>
            )}
            orientation="vertical"
            onChange={this.handleVolume}
            invert
            pearling
          />
        </div>
        <MuteCueButton
          muteHandler={this.handleMute}
          cueHandler={this.handleCue}
          muted={this.props.muted}
          cued={this.props.cued}
        />
        <div className="left"></div>
        <div className="right"></div>
        <div className="bottom"></div>
        <div className="top"></div>
      </div>
    )
  }
}
