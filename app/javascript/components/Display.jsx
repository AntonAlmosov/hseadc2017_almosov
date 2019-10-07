import React from 'react'

export default class Display extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      counter: this.props.current
    }

    // this.handleDisplaySwitch = this.handleDisplaySwitch.bind(this)
  }

  // handleDisplaySwitch() {
  //   if (this.state.counter < this.props.info.length - 1)
  //     this.setState({
  //       counter: this.state.counter + 1
  //     })
  //   else
  //     this.setState({
  //       counter: 0
  //     })
  // }

  render() {
    return (
      <div className="Display" onClick={this.handleDisplaySwitch}>
        <h4>{this.props.info[this.props.current].name}</h4>
        <span>{this.props.info[this.props.current].value}</span>
      </div>
    )
  }
}
