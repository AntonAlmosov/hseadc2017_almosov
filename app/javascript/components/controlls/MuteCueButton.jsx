import React from 'react'

export default ({ muteHandler, muted, cueHandler, cued }) => {
  return (
    <div className={'muteCueButton col'}>
      <div
        onClick={muteHandler}
        className={muted ? 'muteButton active' : 'muteButton'}
      >
        MUTE
      </div>
      <div
        onClick={cueHandler}
        className={cued ? 'cueButton active' : 'cueButton'}
      >
        CUE
      </div>
    </div>
  )
}
