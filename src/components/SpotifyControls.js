import React, { Component } from 'react';
import '../css/SpotifyControls.css';
import * as SpotifyFunctions from '../spotifyFunctions.js'

class SpotifyControls extends Component {

  constructor(props){
    super(props)
    this.classes = props;
    this.state = {
      user: {
        display_name: null
      }
    }
  }

  async componentDidMount() {
    await SpotifyFunctions.setAccessToken(this.props.accessToken);
    const { body: user } = await SpotifyFunctions.getMe();
    this.setState({'user': user});
  }

render() {
    return (
      <div className='SpotifyControls'>
        {this.state.user ? <div>Logged in as {this.state.user.display_name} </div>: <div>Not logged in.</div>}
      </div>
    )
  }
}

export default SpotifyControls;