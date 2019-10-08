import React from 'react'

export default ({ handleClick, octave }) => {
  return (
    <div className="keyboardContainer">
      <div
        onClick={handleClick.bind(this, 'C' + octave)}
        className="synthKey"
      ></div>
      <div
        onClick={handleClick.bind(this, 'D' + octave)}
        className="synthKey"
      ></div>
      <div
        onClick={handleClick.bind(this, 'E' + octave)}
        className="synthKey"
      ></div>
      <div
        onClick={handleClick.bind(this, 'F' + octave)}
        className="synthKey"
      ></div>
      <div
        onClick={handleClick.bind(this, 'G' + octave)}
        className="synthKey"
      ></div>
      <div
        onClick={handleClick.bind(this, 'A' + octave)}
        className="synthKey"
      ></div>
      <div
        onClick={handleClick.bind(this, 'B' + octave)}
        className="synthKey"
      ></div>
      <div
        onClick={handleClick.bind(this, 'C' + (octave + 1))}
        className="synthKey"
      ></div>
    </div>
  )
}
