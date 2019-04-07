// ConnectSpotify.js

import React, { Component } from 'react';
import '../css/ConnectSpotify.css';
import * as SpotifyFunctions from '../spotifyFunctions.js';

class ConnectSpotify extends Component {
  render() {
    return (
      <div className="ConnectSpotify">
        <a href={SpotifyFunctions.redirectUrlToSpotifyForLogin()}>
          <button type="button">Connect to Spotify</button>
        </a>
      </div>
    );
  }
}

export default ConnectSpotify;
