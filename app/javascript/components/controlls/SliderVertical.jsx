import _ from 'lodash'
import React from 'react'

export default class SliderVertical extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mouseDown: false,
      area: {
        top: 0,
        bottom: 0,
        height: 0
      },
      thumb: {
        top: 0
      }
    }

    this.slideArea = React.createRef()

    _.bindAll(
      this,
      'handleMouseMove',
      'handleMouseDown',
      'handleMouseUp',
      'moveThumb',
      'calculateTop',
      'calculateValue'
    )
  }

  componentDidMount() {
    const { y, height } = this.slideArea.current.getBoundingClientRect()

    this.setState({
      area: {
        top: y,
        bottom: y + height,
        height: height
      },
      thumb: {
        top: this.calculateTop(height)
      }
    })

    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  shouldComponentUpdate(nextProps, nextState) {
    const { height } = this.state.area
    // console.log(nextProps.value)
    // console.log(nextState)
    // if (nextState.thumb.top == this.state.thumb.top) {
    if (nextProps.value != this.props.value) {
      // console.log('true')
      nextState.thumb.top = this.calculateTop(height)
    }

    return true
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

  moveThumb(screenY) {
    const { name, property, min, max, handleValueChange, n } = this.props
    const areatop = this.state.area.top
    const areaBottom = this.state.area.bottom
    const thumbTop = screenY - areatop

    if (thumbTop >= 0 && screenY <= areaBottom) {
      const value = this.calculateValue(thumbTop)
      console.log(value)
      this.props.handleValueChange(name, property, value, n)

      this.setState({
        thumb: {
          top: thumbTop
        }
      })
    }
  }

  calculateTop(height) {
    const { min, max, value } = this.props
    const range = max - min
    const coef = range / height
    const top = value / coef

    return top
  }

  calculateValue(thumbTop) {
    const { min, max } = this.props
    const { height } = this.state.area
    const range = max - min
    const coef = range / height
    const value = thumbTop * coef

    return value
  }

  render() {
    const { top } = this.state.thumb

    const style = {
      transform: `translateY(${top}px)`
    }

    return (
      <div className="SliderVerticalWrapper">
        <div
          className="Slider"
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
      </div>
    )
  }
}
