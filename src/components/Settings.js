import React, { Component } from 'react';
import '../css/Settings.css';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loopTrigger: '',
        loopTriggerKeycode: ''
    };
    this.keydown = this.keydown.bind(this);
    this.triggerRef = React.createRef();
  }

  componentDidMount() {
    const savedTrigger = localStorage.getItem('loopTriggerKeycode');
    this.setState({loopTrigger: String.fromCharCode(savedTrigger) || null});
  }

  keydown(event) {
    this.setState({loopTriggerKeycode: event.keyCode});
    this.setState({loopTrigger: event.key});
    localStorage.setItem('loopTriggerKeycode', event.keyCode);

    this.triggerRef.current.blur();

  }
  render() {
    return (
      <div className="Settings">
        <h3>Config</h3>
        <input type="text" ref={this.triggerRef} value={this.state.loopTrigger} readOnly onKeyDown={this.keydown}/>
      </div>
    );
  }
}

export default Settings;
