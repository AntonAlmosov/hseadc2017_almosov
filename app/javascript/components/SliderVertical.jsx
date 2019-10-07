import _ from 'lodash'
import React from 'react'

export default class Slider extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mouseDown: false,
      area: {
        left: 0,
        right: 0,
        width: 0
      },
      thumb: {
        left: 0
      }
    }

    this.slideArea = React.createRef()

    _.bindAll(
      this,
      'handleMouseMove',
      'handleMouseDown',
      'handleMouseUp',
      'moveThumb',
      'calculateLeft',
      'calculateValue'
    )
  }

  componentDidMount() {
    const { y, height } = this.slideArea.current.getBoundingClientRect()

    this.setState({
      area: {
        left: y,
        right: y + height,
        width: height
      },
      thumb: {
        left: this.calculateLeft(height)
      }
    })

    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  handleDragOver(e) {
    e.preventDefault()
  }

  handleMouseDown(e) {
    e.preventDefault()

    this.setState({
      mouseDown: true
    })
  }

  handleMouseUp() {
    const { name, handleMouseUp } = this.props

    if (this.state.mouseDown) {
      // handleMouseUp(name)

      this.setState({
        mouseDown: false
      })
    }
  }

  handleMouseMove(e) {
    const { mouseDown } = this.state

    if (mouseDown) {
      this.moveThumb(e.screenY)
    }
  }

  moveThumb(screenX) {
    const { name, min, max, handleValueChange } = this.props
    const areaLeft = this.state.area.left
    const areaRight = this.state.area.right
    const thumbLeft = screenX - areaLeft

    if (thumbLeft >= 0 && screenX <= areaRight) {
      const value = this.calculateValue(thumbLeft)
      handleValueChange(name, value)

      this.setState({
        thumb: {
          left: thumbLeft
        }
      })
    }
  }

  calculateLeft(width) {
    const { min, max, value } = this.props
    const range = max - min
    const coef = range / width
    const left = value / coef

    return left
  }

  calculateValue(thumbLeft) {
    const { min, max } = this.props
    const { width } = this.state.area
    const range = max - min
    const coef = range / width
    const value = thumbLeft * coef

    return value
  }

  render() {
    const { left } = this.state.thumb

    const style = {
      transform: `translateY(${left}px)`
    }

    return (
      <div
        className="SliderVertical"
        ref={this.slideArea}
        onDragOver={this.handleDragOver}
        onDrop={this.handleDrop}
      >
        <div
          className="thumb"
          style={style}
          onMouseDown={this.handleMouseDown}
        />
      </div>
    )
  }
}
