import React from 'react'

export default ({
  clickHandler,
  active,
  textTrue,
  textFalse,
  cssTrue,
  cssFalse
}) => {
  return (
    <div
      className={
        active ? 'controllsButton ' + cssTrue : 'controllsButton ' + cssFalse
      }
      onClick={clickHandler}
    >
      {active ? textTrue : textFalse}
    </div>
  )
}
