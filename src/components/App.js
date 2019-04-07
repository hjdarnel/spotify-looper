import React, { Component } from 'react';
import '../css/App.css';
import SpotifyContainer from './SpotifyContainer'
import Settings from './Settings'

class App extends Component {
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
          <SpotifyContainer/>
        </div>
        <div className="settings">
          <Settings/>
        </div>
        <div className="footer">
          <p>Footer here</p>
        </div>
      </div>
    );
  }
}

export default App;
