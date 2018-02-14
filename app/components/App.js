import React from 'react';
import VideoPlayer from './video-player';

class App extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                <VideoPlayer/>
            </div>
        );
    }
}

export default App;