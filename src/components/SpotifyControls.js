import React, { Component } from 'react';
import '../css/SpotifyControls.css';
import * as SpotifyFunctions from '../spotifyFunctions.js'

class SpotifyControls extends Component {

  constructor(props){
    super(props)
    this.state = {
      user: {
        display_name: null
      }
    }
    this.interval = null;
  }

  componentDidUpdate(prevProps, prevState){
    if (prevProps.isLooping !== this.props.isLooping) {
      this.togglePlayback();
    };
  }

  async componentDidMount() {
    await SpotifyFunctions.setAccessToken(this.props.accessToken);
    const { body: user } = await SpotifyFunctions.getMe();
    this.setState({'user': user});
  }

  async seek(positionMs){
    await SpotifyFunctions.seek(positionMs);
  }

  async setLoop(intervalMs){
    const seekPosition = this.props.seekTo * 1000;
    this.seek(seekPosition);

    console.debug('Looping every', intervalMs);
    return setInterval(() => {
      this.seek(seekPosition);
      console.debug('Seeked to', seekPosition);
    }, intervalMs);
  }

  async togglePlayback(){
    if (this.props.isLooping) {
      await SpotifyFunctions.resumePlayback();
      this.interval = this.setLoop(this.props.loopLength * 1000);
    } else {
      clearInterval(this.interval);
      console.log('Cleared loop');
      await SpotifyFunctions.pausePlayback();
    }
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