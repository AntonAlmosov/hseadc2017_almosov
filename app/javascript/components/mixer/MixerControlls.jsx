import React from 'react'

import PlayButton from '../controlls/PlayButton'
import MixerDisplay from './MixerDisplay'
import Knob from '../controlls/Knob'

export default ({ handleBpm, bpm, handleGain, gain, handlePlay, playing }) => {
  return (
    <div className="mixerControlls col">
      <MixerDisplay />
      <div className="mixerConrollsKnobs">
        <Knob
          name="gain"
          paramName="gain"
          min={0}
          max={100}
          increment={100}
          initialDeg={-45}
          overDeg={270}
          value={gain}
          handleValueChange={handleGain}
        />
        <Knob
          name="BPM"
          paramName="BPM"
          min={80}
          max={220}
          increment={1}
          initialDeg={-165}
          overDeg={375}
          value={bpm}
          handleValueChange={handleBpm}
        />
        <div className="left"></div>
        <div className="right"></div>
        <div className="bottom"></div>
        <div className="top"></div>
      </div>
      <PlayButton playing={playing} handler={handlePlay} />
      <div className="left"></div>
      <div className="right"></div>
      <div className="bottom"></div>
      <div className="top"></div>
    </div>
  )
}
