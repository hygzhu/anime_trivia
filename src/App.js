import React, { Component } from 'react';
import './App.css';
import Trivia from './trivia';
import Menu from "./menu"
import Score from "./score"
import 'react-notifications/lib/notifications.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      screen: "menu",
      mode: "visible",
      choices: 4,
      score: 0
    }
  }

  screen() {
    const screen = this.state.screen;
    const modeMultiplier = this.state.mode === "visible" ? 0.1 : 1;
    const choicesMultiplier = this.state.choices / 4;
    const multiplier = 1 * modeMultiplier * choicesMultiplier;

    if (screen === "trivia") {
      return <Trivia
        mode={this.state.mode}
        choices={this.state.choices}
        multiplier={multiplier}
        scoreCallback={this.scoreCallback} />
    } else if (screen === "menu") {
      return (
        <div>
          <Menu
            multiplier={multiplier}
            modeMultiplier={modeMultiplier}
            choicesMultiplier={choicesMultiplier}
            choices={this.state.choices}
            mode={this.state.mode}
            changeState={this.changeState}
            setMode={this.setMode}
            setChoices={this.setChoices}
          />
        </div>
      );
    } else if (screen === "score") {
      return (
        <Score
          changeState={this.changeState}
          score={this.state.score}
        />
      );
    }
  }

  changeState = (newState) => {
    this.setState({ screen: newState });
  }

  setMode = (newMode) => {
    this.setState({ mode: newMode });
  }

  setChoices = (newChoice) => {
    this.setState({ choices: newChoice });
  }

  scoreCallback = (data) => {
    this.setState({ score: data, screen: "score" });
  }

  render() {
    return (
      <div>
        {this.screen()}
      </div>
    );
  }
}

export default App;
