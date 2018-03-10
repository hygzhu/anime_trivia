import React, { Component } from 'react';
import { connect } from "react-redux";
import "./score.component.css"; // Styles
import { menuScreen } from "../game/game.action"; 


const mapStateToProps = (state) => {
    return {
      game: state.game,
      menu: state.menu,
      trivia: state.trivia
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        menuScreen: () => dispatch(menuScreen()),
    }
  }


class Score extends Component {

    render() {
        const {menuScreen} = this.props

        return (<div>
            <h1>congratulations</h1>
            <h2>Your score was: {this.props.game.score}</h2>
            <button onClick={() => menuScreen()}>Back to menu</button>
        </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Score);