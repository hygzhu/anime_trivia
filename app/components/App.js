import React from 'react';
import Trivia from './trivia';

class App extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            screen: "menu",
            mode: "visible",
            choices: 4,
            score: 0
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
        const modeMultiplier = this.state.mode == "visible" ? 0.1 : 1;
        const choicesMultiplier = this.state.choices/4;
        const multiplier = 1* modeMultiplier * choicesMultiplier;

        if(screen == "trivia"){
            return <Trivia 
            mode={this.state.mode} 
            choices={this.state.choices} 
            multiplier={multiplier}
            scoreCallback = {this.scoreCallback}/>;
        }else if(screen == "menu"){
            return(
            <div>
                <h1>Anime Song Trivia</h1>
                <button onClick={this.changeState.bind(this,"trivia")}>Play</button>
                <h2>Points Multiplier: {multiplier}x</h2>
                <br/>
                <br/>
                <div>
                    <h3>Mode: {this.state.mode} ({modeMultiplier}x)</h3>
                    <select onChange={this.setMode.bind(this)}>
                        <option value="visible">visible</option>
                        <option value="hidden">hidden</option>
                    </select>
                    <h3>Choices: {this.state.choices} ({choicesMultiplier/4}x)</h3>
                    <select onChange={this.setChoices.bind(this)}>
                        <option value={4}>Few</option>
                        <option value={8}>Many</option>
                    </select>
                </div>
            </div>
            );
        }else if(screen == "score"){
            return(
                <div>
                    <h1>congratulations</h1>
                    <h2>Your score was: {this.state.score}</h2>
                    <button onClick={this.changeState.bind(this,"menu")}>Back to menu</button>
                </div>
            );
        }
    }

    changeState(newState){
       this.setState({screen : newState});
    }

    
    scoreCallback = (data) => {
        this.setState({score: data, screen: "score"});
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