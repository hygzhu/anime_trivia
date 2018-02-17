import React from 'react';
import Trivia from './trivia';



class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            screen: "landing"
        }
    }

    screen() {
        const screen = this.state.screen;
        if(screen == "trivia"){
            return <Trivia />;
        }else if(screen == "landing"){
            return(
            <div>
                <h1>Anime Song Trivia</h1>
                <button onClick={this.play.bind(this)}>Play</button>
            </div>
            );
        }
    }

    play(){
       this.setState({screen : "trivia"});
    }


    render() {
        return(
            <div>
                {this.screen()}
            </div>
        );
    }
}

export default App;