import React from 'react';
import VideoPlayer from './video-player';
import SubmitForm from './submit-form'

class App extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                <SubmitForm score={0} answer={"test"}/>
                <VideoPlayer/>
            </div>
        );
    }
}

export default App;