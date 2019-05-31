import React, { Component } from 'react';
import '../css/Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loopTrigger: '',
        loopTriggerKeycode: ''
    };
    this.loopKeyDown = this.loopKeyDown.bind(this);
    this.handleLoopChange = this.handleLoopChange.bind(this);
    this.handleSeekToChange = this.handleSeekToChange.bind(this);
    this.loopTriggerRef = React.createRef();
  }

  componentDidMount() {
    const savedLoopTrigger = localStorage.getItem('loopTriggerKeycode');
    this.setState({loopTriggerKeycode: savedLoopTrigger});
    this.setState({loopTrigger: String.fromCharCode(savedLoopTrigger) || null});

    this.setupListeners();
  }

  setupListeners() {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === Number(this.state.loopTriggerKeycode)) {
        this.props.onToggleLoop();
        return;
      }
    })
  }

  loopKeyDown(event) {
    if (event.keyCode === 27) {
      this.loopTriggerRef.current.blur();
      return;
    }

    this.setState({loopTriggerKeycode: event.keyCode});
    this.setState({loopTrigger: event.key});
    localStorage.setItem('loopTriggerKeycode', event.keyCode);

    this.loopTriggerRef.current.blur();
  }

  handleSeekToChange(e) {
    this.props.onSeekToChange(e.target.value);
  }

  handleLoopChange(e) {
    this.props.onLoopLengthChange(e.target.value);
  }

  render() {
    return (
      <div className="Settings">
        <h3>Config</h3>
        <label>Toggle Loop</label> <input type="text" ref={this.loopTriggerRef} value={this.state.loopTrigger} readOnly onKeyDown={this.loopKeyDown}/><br/>
        <label>Loop to time (seconds)</label> <input type="number" min="0" value={this.props.playerState.seekTo} onChange={this.handleSeekToChange}/><br/>
        <label>Loop Length (seconds)</label> <input type="number" min="2" value={this.props.playerState.loopLength} onChange={this.handleLoopChange}/>
      </div>
    );
  }
}

export default Settings;
