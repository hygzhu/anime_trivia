import React from 'react';
import Trivia from './trivia';



class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            screen: "landing",
            mode: "visible",
            choices: 4
        }
    }

    setMode(event){
        this.setState({mode : event.target.value });
    }

    setChoices(event){
        this.setState({choices : event.target.value });
    }

    screen() {
        const screen = this.state.screen;
        if(screen == "trivia"){
            return <Trivia mode={this.state.mode} choices={this.state.choices}/>;
        }else if(screen == "landing"){
            return(
            <div>
                <h1>Anime Song Trivia</h1>
                <button onClick={this.play.bind(this)}>Play</button>
                <br/>
                <br/>
                <div>
                    <h3>Mode: {this.state.mode}</h3>
                    <select onChange={this.setMode.bind(this)}>
                        <option value="visible">visible</option>
                        <option value="hidden">hidden</option>
                    </select>
                    <h3>Choices: {this.state.choices}</h3>
                    <select onChange={this.setChoices.bind(this)}>
                        <option value={4}>Few</option>
                        <option value={8}>Many</option>
                    </select>
                </div>
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