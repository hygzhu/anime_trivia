import React from 'react';
import ReactPlayer from 'react-player';

export default class VideoPlayer extends React.Component{
    render(){
        return(
            <div>
                <ReactPlayer 
                url='../../resources/Ending1-Konosuba.webm'
                width='100%'
                height='100vh'
                playing
                loop
                />
            </div>
        );
    }
}