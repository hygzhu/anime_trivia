import React from 'react';
import Trivia from './trivia';

class App extends React.Component {

    constructor(props){
        super(props);
    }

    render() {
        return(
            <div>
                <Trivia/>
            </div>
        );
    }
}

export default App;