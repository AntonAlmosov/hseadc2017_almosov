import React from 'react'
import Autofilter from './Autofilter'
import Autopanner from './Autopanner'
import Autowah from './Autowah'
import Bitcrusher from './Bitcrusher'
import Chebyshev from './Chebyshev'
import Chorus from './Chorus'
import Phaser from './Phaser'
import Distortion from './Distortion'
import JSCReverb from './JSCReverb'

export default ({ synth, handler, subHandler, handleConnect }) => {
  return (
    <div className="effectsWrapper row">
      <Autopanner
        value={synth.autopanner}
        handler={handler}
        subHandler={subHandler}
        isConnected={synth.connected.autopanner}
        handleConnect={handleConnect}
      />
      <Bitcrusher
        value={synth.bitcrusher}
        handler={handler}
        subHandler={subHandler}
        isConnected={synth.connected.bitcrusher}
        handleConnect={handleConnect}
      />
      <Chorus
        value={synth.chorus}
        handler={handler}
        subHandler={subHandler}
        isConnected={synth.connected.chorus}
        handleConnect={handleConnect}
      />
      <Phaser
        value={synth.phaser}
        handler={handler}
        subHandler={subHandler}
        isConnected={synth.connected.chorus}
        handleConnect={handleConnect}
      />
      <Distortion
        value={synth.distortion}
        handler={handler}
        subHandler={subHandler}
        isConnected={synth.connected.chorus}
        handleConnect={handleConnect}
      />
      <JSCReverb
        value={synth.jscreverb}
        handler={handler}
        subHandler={subHandler}
        isConnected={synth.connected.chorus}
      />
    </div>
  )
}
