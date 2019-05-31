import React, { Component } from 'react';
import '../css/App.css';
import SpotifyContainer from './SpotifyContainer'
import Settings from './Settings'

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      playerState: {
        isLooping: false,
        loopLength: 5,
        seekTo: 10
      }
    }
  }

  onToggleLoop = () => {
    this.setState(prevState => {
      const newState = prevState;
      newState.playerState.isLooping = !prevState.playerState.isLooping;
      return newState;
    });
  };

  onLoopLengthChange = (value) => {
    this.setState(prevState => {
      const newState = prevState;
      newState.playerState.loopLength = value;
      return newState;
    });
  };

  onSeekToChange = (value) => {
    this.setState(prevState => {
      const newState = prevState;
      newState.playerState.seekTo = value;
      return newState;
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">Spotify Controller <span role="img" aria-label="smile">🙂</span></header>
        <div className="search">
          <p>Search</p>
        </div>
        <div className="results">
          <p>Results</p>
        </div>
        <div className="spotifyPlayer">
          <SpotifyContainer playerState={this.state.playerState}/>
        </div>
        <div className="settings">
          <Settings
            playerState={this.state.playerState}
            onToggleLoop={this.onToggleLoop}
            onLoopLengthChange={this.onLoopLengthChange}
            onSeekToChange={this.onSeekToChange}/>
        </div>
        <div className="footer">
          <p>Footer here</p>
        </div>
      </div>
    );
  }
}

export default App;
