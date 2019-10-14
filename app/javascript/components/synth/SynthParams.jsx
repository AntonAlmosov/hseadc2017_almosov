import React from 'react'
import SynthNormal from './params/SynthNormal'
import SynthDrums from './params/SynthDrums'
import SynthPluck from './params/SynthPluck'

export default ({ synth, handler, synthHandler }) => {
  let currentSynth = synth.synth
  return (
    <div>
      {currentSynth == 'Synth' && (
        <SynthNormal
          synth={synth}
          handler={handler}
          synthHandler={synthHandler}
        />
      )}
      {currentSynth == 'MembraneSynth' && (
        <SynthDrums
          synth={synth}
          handler={handler}
          synthHandler={synthHandler}
        />
      )}
      {currentSynth == 'PluckSynth' && (
        <SynthPluck synth={synth} handler={handler} />
      )}
    </div>
  )
}
