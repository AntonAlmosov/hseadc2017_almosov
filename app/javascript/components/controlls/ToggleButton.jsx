import React from 'react'

export default ({ isTrue, handler, customClass, text }) => {
  return (
    <div
      onClick={handler}
      className={isTrue ? 'toggleButton active ' + customClass : 'toggleButton'}
    >
      {text}
    </div>
  )
}
