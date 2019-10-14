import React from 'react'
import _ from 'lodash'
import SequensorColumn from './SequensorColumn'

export default class Sequensor extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mouseDown: false,
      sequense: this.props.sequense
    }

    _.bindAll(this, 'handleMouseDown', 'handleMouseUp', 'handleSequense')
  }

  handleMouseDown() {
    this.setState({
      mouseDown: true
    })
  }

  handleMouseUp() {
    this.setState({
      mouseDown: false
    })
  }

  handleSequense(col, note, click) {
    let sequense = this.state.sequense
    let found = false
    if (click) {
      sequense[col] = sequense[col].filter(val => {
        if (val == note) found = true
        return val != note
      })
      if (!found) sequense[col].push(note)
      this.setState({
        sequense: sequense
      })
      this.props.handleSequense(sequense)
    }
    if (this.state.mouseDown) {
      sequense[col] = sequense[col].filter(val => {
        if (val == note) found = true
        return val != note
      })
      if (!found) sequense[col].push(note)
      this.setState({
        sequense: sequense
      })
      this.props.handleSequense(sequense)
    }
  }

  render() {
    let octave = this.props.octave
    return (
      <div
        className="sequensorWrapper"
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
      >
        <div className="octaveSwitcher col">
          <div
            className={octave == 8 ? 'octaveItem active' : 'octaveItem'}
            onClick={() => this.props.handleOctave(8)}
          >
            8
          </div>
          <div
            className={octave == 7 ? 'octaveItem active' : 'octaveItem'}
            onClick={() => this.props.handleOctave(7)}
          >
            7
          </div>
          <div
            className={octave == 6 ? 'octaveItem active' : 'octaveItem'}
            onClick={() => this.props.handleOctave(6)}
          >
            6
          </div>
          <div
            className={octave == 5 ? 'octaveItem active' : 'octaveItem'}
            onClick={() => this.props.handleOctave(5)}
          >
            5
          </div>
          <div
            className={octave == 4 ? 'octaveItem active' : 'octaveItem'}
            onClick={() => this.props.handleOctave(4)}
          >
            4
          </div>
          <div
            className={octave == 3 ? 'octaveItem active' : 'octaveItem'}
            onClick={() => this.props.handleOctave(3)}
          >
            3
          </div>
          <div
            className={octave == 2 ? 'octaveItem active' : 'octaveItem'}
            onClick={() => this.props.handleOctave(2)}
          >
            2
          </div>
          <div
            className={octave == 1 ? 'octaveItem active' : 'octaveItem'}
            onClick={() => this.props.handleOctave(1)}
          >
            1
          </div>
        </div>
        <div className="notes">
          <div className="noteItem">B{this.props.octave}</div>
          <div className="noteItem">A{this.props.octave}</div>
          <div className="noteItem">G{this.props.octave}</div>
          <div className="noteItem">F{this.props.octave}</div>
          <div className="noteItem">E{this.props.octave}</div>
          <div className="noteItem">D{this.props.octave}</div>
          <div className="noteItem">C{this.props.octave}</div>
        </div>
        <div className="sequensor">
          <SequensorColumn
            col={0}
            octave={octave}
            active={this.state.sequense[0]}
            handler={this.handleSequense}
            index={this.props.index}
          />
          <SequensorColumn
            col={1}
            octave={octave}
            active={this.state.sequense[1]}
            handler={this.handleSequense}
            index={this.props.index}
          />
          <SequensorColumn
            col={2}
            octave={octave}
            active={this.state.sequense[2]}
            handler={this.handleSequense}
            index={this.props.index}
          />
          <SequensorColumn
            col={3}
            octave={octave}
            active={this.state.sequense[3]}
            handler={this.handleSequense}
            index={this.props.index}
          />
          <SequensorColumn
            col={4}
            octave={octave}
            active={this.state.sequense[4]}
            handler={this.handleSequense}
            index={this.props.index}
          />
          <SequensorColumn
            col={5}
            octave={octave}
            active={this.state.sequense[5]}
            handler={this.handleSequense}
            index={this.props.index}
          />
          <SequensorColumn
            col={6}
            octave={octave}
            active={this.state.sequense[6]}
            handler={this.handleSequense}
            index={this.props.index}
          />
          <SequensorColumn
            col={7}
            octave={octave}
            active={this.state.sequense[7]}
            handler={this.handleSequense}
            index={this.props.index}
          />
          <SequensorColumn
            col={8}
            octave={octave}
            active={this.state.sequense[8]}
            handler={this.handleSequense}
            index={this.props.index}
          />
          <SequensorColumn
            col={9}
            octave={octave}
            active={this.state.sequense[9]}
            handler={this.handleSequense}
          />
          <SequensorColumn
            col={10}
            octave={octave}
            active={this.state.sequense[10]}
            handler={this.handleSequense}
            index={this.props.index}
          />
          <SequensorColumn
            col={11}
            octave={octave}
            active={this.state.sequense[11]}
            handler={this.handleSequense}
            index={this.props.index}
          />
          <SequensorColumn
            col={12}
            octave={octave}
            active={this.state.sequense[12]}
            handler={this.handleSequense}
            index={this.props.index}
          />
          <SequensorColumn
            col={13}
            octave={octave}
            active={this.state.sequense[13]}
            handler={this.handleSequense}
            index={this.props.index}
          />
          <SequensorColumn
            col={14}
            octave={octave}
            active={this.state.sequense[14]}
            handler={this.handleSequense}
            index={this.props.index}
          />
          <SequensorColumn
            col={15}
            octave={octave}
            active={this.state.sequense[15]}
            handler={this.handleSequense}
            index={this.props.index}
          />
        </div>
        <div className="left"></div>
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="right"></div>
      </div>
    )
  }
}
