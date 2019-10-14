import React from 'react'

export default ({ current, items, names, handler, name, paramName }) => {
  return (
    <div className="oscillatorPicker">
      {items.map((value, n) => {
        return (
          <div
            key={value}
            className={
              current == value
                ? 'oscillatorPickerItem active'
                : 'oscillatorPickerItem'
            }
            onClick={() => handler(name, paramName, value)}
          >
            {names[n]}
          </div>
        )
      })}
    </div>
  )
}
