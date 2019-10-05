import React from 'react'
import Tone from 'tone'

export default class Synthesizer extends React.Component{
    constructor(props){
        super(props)

        this.state = {
            synth: new Tone.Synth().toMaster(),
            recording: false,
            sequence: [],
            sequenceCounter: 0,
            sequencePlayer: '',
            playing: false
        }
        this.handleSynthKeyPress = this.handleSynthKeyPress.bind(this)
        this.handleRecordKeyPress = this.handleRecordKeyPress.bind(this)
        this.handleStartKeyPress = this.handleStartKeyPress.bind(this)
    }

    handleSynthKeyPress(key){
        if(this.state.recording){
            let arr = this.state.sequence
            this.state.synth.triggerAttackRelease(key, '4n')
            if(this.state.sequenceCounter < 8){
                arr.push(key)
                this.setState({
                    sequence: arr,
                    sequenceCounter: this.state.sequenceCounter + 1
                })
                console.log(this.state.sequence + ' ' + this.state.sequenceCounter)
            }
            else{
                arr.shift()
                arr.push(key)
                this.setState({
                    sequence: arr
                })
                console.log(this.state.sequence + ' ' + this.state.sequenceCounter)
            }
        }
        else{
            var synth = this.state.synth
            this.state.synth.triggerAttackRelease(key, '4n')
        }
    }

    handleRecordKeyPress(){
        if(this.state.recording){
            this.setState({
                recording: !this.state.recording,
            })
        }
        else{
            this.setState({
                recording: !this.state.recording,
                sequence: [],
                sequenceCounter: 0
            })
        }
        
    }

    handleStartKeyPress(){
        let synth = new Tone.Synth().toMaster()
        Tone.Transport.bpm.value = 140
        if(this.state.playing){
            Tone.Transport.cancel()
            this.setState({
                playing: !this.state.playing
            })
        }
        else{
            this.setState({
                recording: false,
                playing: !this.state.playing
            })
            var sequence = new Tone.Sequence(function(time, note){
                synth.triggerAttackRelease(note, '4n', time)
            }, this.state.sequence, '4n')
            Tone.Transport.start()
            sequence.start()
        }
        
    }

    render(){
        return(
            <div className='appContainer'>
                <div className='keyboardContainer'>
                    <div onClick={() => this.handleSynthKeyPress('C4')} className='synthKey'></div>
                    <div onClick={() => this.handleSynthKeyPress('D4')} className='synthKey'></div>
                    <div onClick={() => this.handleSynthKeyPress('E4')} className='synthKey'></div>
                    <div onClick={() => this.handleSynthKeyPress('F4')} className='synthKey'></div>
                    <div onClick={() => this.handleSynthKeyPress('G4')} className='synthKey'></div>
                    <div onClick={() => this.handleSynthKeyPress('A4')} className='synthKey'></div>
                    <div onClick={() => this.handleSynthKeyPress('B4')} className='synthKey'></div>
                    <div onClick={() => this.handleSynthKeyPress('C5')} className='synthKey'></div>
                </div>
                <div className='controllsContainer'>
                    <div 
                        className={this.state.recording ? 'controllsButton recording' : 'controllsButton record'}
                        onClick={this.handleRecordKeyPress}
                    >
                        {this.state.recording ? 'Recording' : 'Record'}
                    </div>
                    <div 
                        className={this.state.playing ? 'controllsButton playing' : 'controllsButton play'}
                        onClick={this.handleStartKeyPress}
                    >
                        {this.state.playing ? 'Playing' : 'Play'}
                    </div>
                </div>
            </div>
        )
    }
}