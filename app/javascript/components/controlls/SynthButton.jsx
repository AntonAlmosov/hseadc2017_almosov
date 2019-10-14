import React from 'react'

export default ({ name, nameHandler }) => {
  return (
    <div className="synthButton">
      <div className="synthButtonItem input">
        <input defaultValue={name} onChange={nameHandler} />
      </div>
      <div className="synthButtonItem">LOAD</div>
      <div className="synthButtonItem">SAVE</div>
    </div>
  )
}
