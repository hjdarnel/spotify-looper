import React, { Component } from 'react';
import '../css/PlaybackIndicator.css';


class PlaybackIndicator extends Component {
  render() {
    return (
      <div className='PlaybackIndicator'>
       {this.props.isLooping ? <p className="active">Looping</p> : <p className="inactive">Not looping</p>}
      </div>
    )
  }
}

export default PlaybackIndicator;