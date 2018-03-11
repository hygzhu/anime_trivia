import React from 'react';
import ReactPlayer from 'react-player';
import { connect } from "react-redux";

const mapStateToProps = (state) => {
    return {
      trivia: state.trivia,
      menu: state.menu
    }
  }


class VideoPlayer extends React.Component{

    render(){
        //console.log(this.state.filename);
        const playerSize = this.props.menu.mode === "visible" ? 100 : 0;

        return(
                <ReactPlayer 
                url={this.props.trivia.filename}
                width= {playerSize +'vw'}
                height= {playerSize + 'vh'}
                volume = {0.5}
                playing
                loop
                />
        );
    }
}

export default connect(mapStateToProps)(VideoPlayer);