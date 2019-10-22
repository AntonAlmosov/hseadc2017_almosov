import _ from 'lodash'
import React from 'react'

export default class Knob extends React.Component {
  constructor(props) {
    super(props)

    let value = this.props.increment * this.props.increment

    this.state = {
      mouseDown: false,
      name: this.props.paramName
        .replace(/^\w/, c => c.toUpperCase())
        .slice(0, 8),
      value: value,
      deg: this.props.initialDeg,
      screenY: 0
    }

    _.bindAll(
      this,
      'handleMouseDown',
      'handleMouseMove',
      'handleMouseUp',
      'moveKnob',
      'calculateDeg'
    )
  }

  componentDidMount() {
    const value = this.props.value * this.props.increment
    const deg = this.calculateDeg(value)

    this.setState({
      mouseDown: false,
      value: value,
      deg: this.props.initialDeg + deg,
      screenY: 0
    })

    document.addEventListener('mouseup', this.handleMouseUp)
    document.addEventListener('mousemove', this.handleMouseMove)
  }

  handleMouseDown(e) {
    e.preventDefault()

    this.setState({
      mouseDown: true,
      screenY: e.clientX
    })
  }

  handleMouseMove(e) {
    const { mouseDown } = this.state

    if (mouseDown) {
      this.moveKnob(e.clientX)

      this.setState({
        name: (this.state.value / this.props.increment).toFixed(2)
      })
    }
  }

  handleMouseUp() {
    const { name, handleMouseUp } = this.props

    if (this.state.mouseDown) {
      // handleMouseUp(name)

      this.setState({
        mouseDown: false,
        name: this.props.paramName
          .replace(/^\w/, c => c.toUpperCase())
          .slice(0, 8)
      })
    }
  }

  moveKnob(screenY) {
    const min = parseInt(this.props.min)
    const max = parseInt(this.props.max)
    const oldScreenY = this.state.screenY
    const { deg } = this.state
    const difference = screenY - oldScreenY
    let { value } = this.state

    value += difference

    if (value < min) {
      value = min
    } else if (value > max) {
      value = max
    }

    this.props.handleValueChange(
      this.props.name,
      this.props.paramName,
      value / this.props.increment,
      this.props.synthN
    )

    this.setState({
      screenY: screenY,
      value: value,
      deg: this.props.initialDeg + this.calculateDeg(value)
    })
  }

  calculateDeg(value) {
    const { max } = this.props
    const coef = this.props.overDeg / max
    const deg = value * coef

    return deg
  }

  render() {
    const { deg } = this.state
    const style = {
      transform: `rotate(${deg}deg)`
    }

    return (
      <div className={'KnobWrapper'}>
        <h1>{this.state.name}</h1>
        <div
          className="Knob"
          style={style}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
        />
      </div>
    )
  }
}
