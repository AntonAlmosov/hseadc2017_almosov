import React from 'react'

export default ({ handler }) => {
  return (
    <div className="closeButton" onClick={() => handler('mixer')}>
      <div className="closeButtonIcon"></div>
    </div>
  )
}
