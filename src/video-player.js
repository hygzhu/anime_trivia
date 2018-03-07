import React from 'react';
import ReactPlayer from 'react-player';

export default class VideoPlayer extends React.Component{

    render(){
        //console.log(this.state.filename);
        const playerSize = this.props.mode === "visible" ? 100 : 0;

        return(
            <div>
                <ReactPlayer 
                url={this.props.filename}
                width= {playerSize +'%'}
                height= {playerSize + 'vh'}
                volume = {0.7}
                playing
                loop
                />
            </div>
        );
    }
}