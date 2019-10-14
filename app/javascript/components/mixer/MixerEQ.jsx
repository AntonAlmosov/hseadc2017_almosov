import React from 'react'
import Knob from '../controlls/Knob'

export default ({ eq, handleEQ, n }) => {
  return (
    <div className="mixerEQ">
      <Knob
        name="eq"
        paramName="high"
        min={-100}
        max={100}
        increment={10}
        initialDeg={90}
        overDeg={135}
        value={eq.high.value}
        handleValueChange={handleEQ}
        synthN={n}
      />
      <Knob
        name="eq"
        paramName="mid"
        min={-100}
        max={100}
        increment={10}
        initialDeg={90}
        overDeg={135}
        value={eq.mid.value}
        handleValueChange={handleEQ}
        synthN={n}
      />
      <Knob
        name="eq"
        paramName="low"
        min={-100}
        max={100}
        increment={10}
        initialDeg={90}
        overDeg={135}
        value={eq.low.value}
        handleValueChange={handleEQ}
        synthN={n}
      />
    </div>
  )
}
