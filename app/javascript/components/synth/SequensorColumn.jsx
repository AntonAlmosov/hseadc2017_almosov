import React from 'react'

export default ({ col, octave, active, handler, index }) => {
  let checked = [false, false, false, false, false, false, false]
  active.map(val => {
    if (val == 'C' + octave) {
      checked[0] = true
    }
    if (val == 'D' + octave) {
      checked[1] = true
    }
    if (val == 'E' + octave) {
      checked[2] = true
    }
    if (val == 'F' + octave) {
      checked[3] = true
    }
    if (val == 'G' + octave) {
      checked[4] = true
    }
    if (val == 'A' + octave) {
      checked[5] = true
    }
    if (val == 'B' + octave) {
      checked[6] = true
    }
  })
  return (
    <div
      className="sequensorColumn"
      style={index == col ? { backgroundColor: '#DEDEDE' } : {}}
    >
      <div
        onMouseDown={() => handler(col, 'B' + octave, true)}
        onMouseOver={() => handler(col, 'B' + octave)}
        className={
          checked[6] ? 'sequensorColumnItem active' : 'sequensorColumnItem'
        }
      ></div>
      <div
        onMouseDown={() => handler(col, 'A' + octave, true)}
        onMouseOver={() => handler(col, 'A' + octave)}
        className={
          checked[5] ? 'sequensorColumnItem active' : 'sequensorColumnItem'
        }
      ></div>
      <div
        onMouseDown={() => handler(col, 'G' + octave, true)}
        onMouseOver={() => handler(col, 'G' + octave)}
        className={
          checked[4] ? 'sequensorColumnItem active' : 'sequensorColumnItem'
        }
      ></div>
      <div
        onMouseDown={() => handler(col, 'F' + octave, true)}
        onMouseOver={() => handler(col, 'F' + octave)}
        className={
          checked[3] ? 'sequensorColumnItem active' : 'sequensorColumnItem'
        }
      ></div>
      <div
        onMouseDown={() => handler(col, 'E' + octave, true)}
        onMouseOver={() => handler(col, 'E' + octave)}
        className={
          checked[2] ? 'sequensorColumnItem active' : 'sequensorColumnItem'
        }
      ></div>
      <div
        onMouseDown={() => handler(col, 'D' + octave, true)}
        onMouseOver={() => handler(col, 'D' + octave)}
        className={
          checked[1] ? 'sequensorColumnItem active' : 'sequensorColumnItem'
        }
      ></div>
      <div
        onMouseDown={() => handler(col, 'C' + octave, true)}
        onMouseOver={() => handler(col, 'C' + octave)}
        className={
          checked[0] ? 'sequensorColumnItem active' : 'sequensorColumnItem'
        }
      ></div>
    </div>
  )
}
