import React from 'react'

export default ({ current, items, names, handler, name, paramName }) => {
  let itemClass = 'pickerItem' + items.length
  return (
    <div className="pickerWrapper col">
      {items.map((value, n) => {
        return (
          <div
            key={value}
            className={current == value ? itemClass + ' active' : itemClass}
            onClick={() => handler(value)}
          >
            {names[n]}
          </div>
        )
      })}
    </div>
  )
}
