import React from 'react'

import KnobParam from './KnobParam'
import Display from './Display'

export default class Synth extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      current: 0,
      checkAMFM:
        this.props.value.oscillator.sourceType == 'am' ||
        this.props.value.oscillator.sourceType == 'fm'
    }
    this.changeSubEffect = this.changeSubEffect.bind(this)
    this.changeEffect = this.changeEffect.bind(this)
  }

  changeSubEffect(effectName, paramName, increment, value) {
    this.props.subHandler(effectName, paramName, increment, value)
    this.forceUpdate()
    if (paramName == 'attack') this.setState({ current: 0 })
    if (paramName == 'decay') this.setState({ current: 1 })
    if (paramName == 'sustain') this.setState({ current: 2 })
    if (paramName == 'release') this.setState({ current: 3 })
  }

  changeEffect(effectName, paramName, increment, value) {
    this.props.handler(effectName, paramName, increment, value)
    this.forceUpdate()
    // if (paramName == 'portamento') this.setState({ current: 4 })
  }

  render() {
    return (
      <div>
        <div className="row">
          <KnobParam
            name="envelope"
            paramName="sustain"
            min={1}
            max={100}
            increment={100}
            initialDeg={-45}
            overDeg={270}
            value={this.props.value.envelope.sustain}
            handleValueChange={this.changeSubEffect}
          />
          <Display
            current={this.state.current}
            info={[
              {
                name: 'Attack',
                value: this.props.value.envelope.attack.toFixed(2)
              },
              {
                name: 'Decay',
                value: this.props.value.envelope.decay.toFixed(2)
              },
              {
                name: 'Sustain',
                value: this.props.value.envelope.sustain.toFixed(2)
              },
              {
                name: 'Release',
                value: this.props.value.envelope.release.toFixed(2)
              }
              // ,
              // {
              //   name: 'Portamento',
              //   value: this.props.value.portamento.toFixed(2)
              // }
            ]}
          />
          <KnobParam
            name="envelope"
            paramName="attack"
            min={1}
            max={200}
            increment={100}
            initialDeg={-45}
            overDeg={270}
            value={this.props.value.envelope.attack}
            handleValueChange={this.changeSubEffect}
          />
          <div className="synthSwitchWrapper">
            <div
              onClick={() =>
                this.changeSubEffect('envelope', 'attackCurve', 0, 'linear')
              }
              className={
                `${this.props.value.envelope.attackCurve}` == 'linear'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Linear
            </div>
            <div
              onClick={() =>
                this.changeSubEffect(
                  'envelope',
                  'attackCurve',
                  0,
                  'exponential'
                )
              }
              className={
                `${this.props.value.envelope.attackCurve}` == 'exponential'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Exponential
            </div>
            <div
              onClick={() =>
                this.changeSubEffect('envelope', 'attackCurve', 0, 'step')
              }
              className={
                `${this.props.value.envelope.attackCurve}` == 'step'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Step
            </div>
            <div
              onClick={() =>
                this.changeSubEffect('envelope', 'attackCurve', 0, 'sine')
              }
              className={
                `${this.props.value.envelope.attackCurve}` == 'sine'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Sine
            </div>
          </div>
        </div>
        <div className="row">
          <KnobParam
            name="envelope"
            paramName="decay"
            min={1}
            max={200}
            increment={100}
            initialDeg={-45}
            overDeg={270}
            value={this.props.value.envelope.decay}
            handleValueChange={this.changeSubEffect}
          />
          <div className="synthSwitchWrapperTwo">
            <div
              onClick={() =>
                this.changeSubEffect('envelope', 'decayCurve', 0, 'linear')
              }
              className={
                `${this.props.value.envelope.decayCurve}` == 'linear'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Linear
            </div>
            <div
              onClick={() =>
                this.changeSubEffect('envelope', 'decayCurve', 0, 'exponential')
              }
              className={
                `${this.props.value.envelope.decayCurve}` == 'exponential'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Exponential
            </div>
          </div>
          <KnobParam
            name="envelope"
            paramName="release"
            min={1}
            max={400}
            increment={100}
            initialDeg={-45}
            overDeg={270}
            value={this.props.value.envelope.release}
            handleValueChange={this.changeSubEffect}
          />
          <div className="synthSwitchWrapper">
            <div
              onClick={() =>
                this.changeSubEffect('envelope', 'releaseCurve', 0, 'linear')
              }
              className={
                `${this.props.value.envelope.releaseCurve}` == 'linear'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Linear
            </div>
            <div
              onClick={() =>
                this.changeSubEffect(
                  'envelope',
                  'releaseCurve',
                  0,
                  'exponential'
                )
              }
              className={
                `${this.props.value.envelope.releaseCurve}` == 'exponential'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Exponential
            </div>
            <div
              onClick={() =>
                this.changeSubEffect('envelope', 'releaseCurve', 0, 'step')
              }
              className={
                `${this.props.value.envelope.releaseCurve}` == 'step'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Step
            </div>
            <div
              onClick={() =>
                this.changeSubEffect('envelope', 'releaseCurve', 0, 'sine')
              }
              className={
                `${this.props.value.envelope.releaseCurve}` == 'sine'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Sine
            </div>
          </div>
          {/* <KnobParam
            name="synth"
            paramName="portamento"
            min={1}
            max={30}
            increment={100}
            initialDeg={-45}
            overDeg={270}
            value={this.props.value.portamento}
            handleValueChange={this.changeEffect}
          /> */}
        </div>
        <div className="oscillatorParams">
          <div className="synthSwitchWrapperSix">
            <div
              onClick={() =>
                this.changeSubEffect(
                  'oscillator',
                  'sourceType',
                  0,
                  'oscillator'
                )
              }
              className={
                `${this.props.value.oscillator.sourceType}` == 'oscillator'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Basic
            </div>
            <div
              onClick={() =>
                this.changeSubEffect('oscillator', 'sourceType', 0, 'fm')
              }
              className={
                `${this.props.value.oscillator.sourceType}` == 'fm'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              FM
            </div>
            <div
              onClick={() =>
                this.changeSubEffect('oscillator', 'sourceType', 0, 'am')
              }
              className={
                `${this.props.value.oscillator.sourceType}` == 'am'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              AM
            </div>
            <div
              onClick={() =>
                this.changeSubEffect('oscillator', 'sourceType', 0, 'fat')
              }
              className={
                `${this.props.value.oscillator.sourceType}` == 'fat'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Fat
            </div>
            <div
              onClick={() =>
                this.changeSubEffect('oscillator', 'sourceType', 0, 'pulse')
              }
              className={
                `${this.props.value.oscillator.sourceType}` == 'pulse'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Pulse
            </div>
            <div
              onClick={() =>
                this.changeSubEffect('oscillator', 'sourceType', 0, 'pwm')
              }
              className={
                `${this.props.value.oscillator.sourceType}` == 'pwm'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              PWM
            </div>
          </div>
          <div
            className={
              !(
                this.props.value.oscillator.sourceType == 'pulse' ||
                this.props.value.oscillator.sourceType == 'pwm'
              )
                ? 'synthSwitchWrapper'
                : 'none'
            }
          >
            <div
              onClick={() =>
                this.changeSubEffect('oscillator', 'baseType', 0, 'sine')
              }
              className={
                `${this.props.value.oscillator.baseType}` == 'sine'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Sine
            </div>
            <div
              onClick={() =>
                this.changeSubEffect('oscillator', 'baseType', 0, 'square')
              }
              className={
                `${this.props.value.oscillator.baseType}` == 'square'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Square
            </div>
            <div
              onClick={() =>
                this.changeSubEffect('oscillator', 'baseType', 0, 'sawtooth')
              }
              className={
                `${this.props.value.oscillator.baseType}` == 'sawtooth'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Sawtooth
            </div>
            <div
              onClick={() =>
                this.changeSubEffect('oscillator', 'baseType', 0, 'triangle')
              }
              className={
                `${this.props.value.oscillator.baseType}` == 'triangle'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Triangle
            </div>
          </div>
          <KnobParam
            hide={
              this.props.value.oscillator.sourceType == 'pulse' ||
              this.props.value.oscillator.sourceType == 'pwm'
            }
            name="oscillator"
            paramName="partialCount"
            min={1}
            max={32}
            increment={1}
            initialDeg={-45}
            overDeg={270}
            value={this.props.value.oscillator.partialCount}
            handleValueChange={this.changeSubEffect}
          />
          <div
            className={
              !(
                this.props.value.oscillator.sourceType == 'oscillator' ||
                this.props.value.oscillator.sourceType == 'fat' ||
                this.props.value.oscillator.sourceType == 'pulse' ||
                this.props.value.oscillator.sourceType == 'pwm'
              )
                ? 'synthSwitchWrapper'
                : 'none'
            }
          >
            <div
              onClick={() =>
                this.changeSubEffect('oscillator', 'modulationType', 0, 'sine')
              }
              className={
                `${this.props.value.oscillator.modulationType}` == 'sine'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Sine
            </div>
            <div
              onClick={() =>
                this.changeSubEffect(
                  'oscillator',
                  'modulationType',
                  0,
                  'square'
                )
              }
              className={
                `${this.props.value.oscillator.modulationType}` == 'square'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Square
            </div>
            <div
              onClick={() =>
                this.changeSubEffect(
                  'oscillator',
                  'modulationType',
                  0,
                  'sawtooth'
                )
              }
              className={
                `${this.props.value.oscillator.modulationType}` == 'sawtooth'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Sawtooth
            </div>
            <div
              onClick={() =>
                this.changeSubEffect(
                  'oscillator',
                  'modulationType',
                  0,
                  'triangle'
                )
              }
              className={
                `${this.props.value.oscillator.modulationType}` == 'triangle'
                  ? 'synthSwitch active'
                  : 'synthSwitch'
              }
            >
              Triangle
            </div>
          </div>
        </div>
      </div>
    )
  }
}
