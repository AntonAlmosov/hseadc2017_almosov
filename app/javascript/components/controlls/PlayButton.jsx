import React from 'react'

export default ({ playing, handler }) => {
  return (
    <div
      onClick={handler}
      className={playing ? 'playButtonActive' : 'playButton'}
    >
      <div className="playButtonIcon"></div>
    </div>
  )
}
