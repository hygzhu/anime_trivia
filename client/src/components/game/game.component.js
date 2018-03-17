import React, { Component } from 'react';
import { connect } from "react-redux";
import "./game.component.css"; // Styles
import Menu from "../menu/menu.component.js"
import Trivia from "../trivia/trivia.component.js"
import Score from "../score/score.component.js"
import Lobby from "../lobby/lobby.component.js"

const mapStateToProps = (state) => {
    return {
        game: state.game
    }
  }

class Game extends Component  {

    render() {
        switch (this.props.game.screen) {
            case "menu":
              return (<Menu />);
            case "trivia":
              return (<Trivia/>);
            case "score":
              return (<Score />);
            case "lobby":
              return (<Lobby />);
            default:
              return (<Menu />);
          }
    }
}

export default connect(mapStateToProps)(Game);