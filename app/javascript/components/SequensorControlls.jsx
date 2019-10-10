import React from 'react'
import StateButton from './StateButton'

export default ({
  handleRecordKeyPress,
  handleStartKeyPress,
  recording,
  playing
}) => {
  return (
    <div className="sequensorControllsContainer">
      <div className="row">
        <StateButton
          clickHandler={handleRecordKeyPress.bind(this)}
          active={recording}
          textTrue="Recording"
          textFalse="Record"
          cssTrue="recording"
          cssFalse="record"
        />
      </div>
      <div className="row">
        <StateButton
          clickHandler={handleStartKeyPress}
          active={playing}
          textTrue="Playing"
          textFalse="Play"
          cssTrue="playing"
          cssFalse="play"
        />
      </div>
    </div>
  )
}
