import React from 'react';
import ReactPlayer from 'react-player';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
      lobby: state.lobby,
    }
  }


class VideoPlayer extends React.Component{

    render(){
        return(
                <ReactPlayer 
                url={this.props.lobby.trivia.filename}
                width= {'100vw'}
                height= {'100vh'}
                volume = {0.5}
                playing
                loop
                />
        );
    }
}

export default connect(mapStateToProps)(VideoPlayer);