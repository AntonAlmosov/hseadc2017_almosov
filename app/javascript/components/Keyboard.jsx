import React from 'react'

export default ({ handleClick }) => {
  return (
    <div className="keyboardContainer">
      <div onClick={handleClick.bind(this, 'C4')} className="synthKey"></div>
      <div onClick={handleClick.bind(this, 'D4')} className="synthKey"></div>
      <div onClick={handleClick.bind(this, 'E4')} className="synthKey"></div>
      <div onClick={handleClick.bind(this, 'F4')} className="synthKey"></div>
      <div onClick={handleClick.bind(this, 'G4')} className="synthKey"></div>
      <div onClick={handleClick.bind(this, 'A4')} className="synthKey"></div>
      <div onClick={handleClick.bind(this, 'B4')} className="synthKey"></div>
      <div onClick={handleClick.bind(this, 'C5')} className="synthKey"></div>
    </div>
  )
}
