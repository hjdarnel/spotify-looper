import React, { Component } from 'react';
import '../css/SpotifyContainer.css';
import ConnectSpotify from './ConnectSpotify';
import SpotifyControls from './SpotifyControls';
import * as SpotifyFunctions from '../spotifyFunctions.js'

class SpotifyContainer extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loggedInToSpotify: false,
            accessToken: null
        }
    }

    componentDidMount(){
    //will check URL for accessToken hash. If it's not there, it will show the connect-spotify-button as a link
    //which will then redirect back to your site with the hash. If there is a hash, then we will jump right into the player
        const localToken = localStorage.getItem('userAccessToken');
        const expiresAt = localStorage.getItem('userAccessExpiresAt');

        if (localToken && expiresAt > Date.now()) {
          this.setState({loggedInToSpotify: true, accessToken: localToken});
        } else {
          const { accessToken, expiresAt } = SpotifyFunctions.checkUrlForSpotifyAccessToken();

          if (accessToken) {
            localStorage.setItem('userAccessToken', accessToken);
            localStorage.setItem('userAccessExpiresAt', expiresAt);
            this.setState({loggedInToSpotify: true, accessToken: accessToken});
          } else {
            this.setState({loggedInToSpotify: false, accessToken: null});
          }
        }
    }

  render() {
    return (
      <div className="SpotifyContainer">
      <div>
        <p>Spotify Controls</p>
        {!this.state.loggedInToSpotify ? <ConnectSpotify /> : <SpotifyControls accessToken={this.state.accessToken}/> }
        </div>
      </div>
    );
  }
}

export default SpotifyContainer;