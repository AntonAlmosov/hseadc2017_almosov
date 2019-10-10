import React from 'react'

import Synthesizer from './Synthesizer'
export default class SynthContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      synthCounter: [0]
    }

    this.switchTabs = this.switchTabs.bind(this)
    this.createTab = this.createTab.bind(this)
  }

  createTab() {
    let increment =
      this.state.synthCounter[this.state.synthCounter.length - 1] + 1
    let newArray = this.state.synthCounter
    newArray.push(increment)
    this.setState({
      synthCounter: newArray
    })
  }

  switchTabs(tab) {
    this.setState({
      current: tab
    })
  }

  render() {
    return (
      <div className="synthContainer">
        <div className="appTabsWrapper">
          {this.state.synthCounter.map(current => {
            return (
              <div onClick={() => this.switchTabs(current)} className="appTab">
                {current}
              </div>
            )
          })}
          <div onClick={this.createTab} className="createTab">
            +
          </div>
        </div>
        <div className="viewsWrapper">
          {this.state.synthCounter.map(current => {
            return <Synthesizer inView={current == this.state.current} />
          })}
        </div>
      </div>
    )
  }
}
