import React from 'react'
import { useState, useEffect } from 'react'

// Usage

let synth = {}
let octave = 0
let prop = {}
export default function KeyboradListener(props) {
  // Call our hook for each key that we'd like to monitor
  const press = useKeyPress(props.handlePlay)
  synth = props.synth
  octave = props.octave
  prop = Object.assign({}, props)
  return press
}

// Hook
function useKeyPress(targetKey, handlePlay) {
  // State for keeping track of whether key is pressed
  const [keyPressed, setKeyPressed] = useState(false)
  // If pressed key is our target key then set to true
  function downHandler({ key }) {
    console.log(key)
    if (key == '1') {
      synth.triggerAttack('C' + octave)
      setKeyPressed(true)
    } else if (key == '2') {
      synth.triggerAttack('D' + octave)
      setKeyPressed(true)
    } else if (key == '3') {
      synth.triggerAttack('E' + octave)
      setKeyPressed(true)
    } else if (key == '4') {
      synth.triggerAttack('F' + octave)
      setKeyPressed(true)
    } else if (key == '5') {
      synth.triggerAttack('G' + octave)
      setKeyPressed(true)
    } else if (key == '6') {
      synth.triggerAttack('A' + octave)
      setKeyPressed(true)
    } else if (key == '7') {
      synth.triggerAttack('B' + octave)
      setKeyPressed(true)
    } else if (key == ' ') {
      prop.handlePlay()
    } else if (key == 'ArrowLeft') prop.changeView('prev')
    else if (key == 'ArrowRight') prop.changeView('next')
    else if (key == 'Escape') prop.changeView('mixer')
  }

  // If released key is our target key then set to false
  const upHandler = ({ key }) => {
    if (key == '1') {
      synth.triggerRelease()
      setKeyPressed(false)
    } else if (key == '2') {
      synth.triggerRelease()
      setKeyPressed(false)
    } else if (key == '3') {
      synth.triggerRelease()
      setKeyPressed(false)
    } else if (key == '4') {
      synth.triggerRelease()
      setKeyPressed(false)
    } else if (key == '5') {
      synth.triggerRelease()
      setKeyPressed(false)
    } else if (key == '6') {
      synth.triggerRelease()
      setKeyPressed(false)
    } else if (key == '7') {
      synth.triggerRelease()
      setKeyPressed(false)
    }
  }

  // Add event listeners
  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
    // Remove event listeners on cleanup
    return () => {
      window.removeEventListener('keydown', downHandler)
      window.removeEventListener('keyup', upHandler)
    }
  }, []) // Empty array ensures that effect is only run on mount and unmount

  return keyPressed
}
