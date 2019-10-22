import React from 'react'

export default ({ playing, handler }) => {
  return (
    <div
      onClick={handler}
      className={playing ? 'playButtonActive' : 'playButton'}
    >
      <div className="playButtonIcon"></div>
      <div className="left"></div>
      <div className="right"></div>
      <div className="bottom"></div>
      <div className="top"></div>
    </div>
  )
}
