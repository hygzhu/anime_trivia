import React, { Component } from 'react';
import { connect } from "react-redux";
import "./menu.component.css"; // Styles
import { changeMode, changeChoices} from "./menu.action"; 
import { play, multiplayer } from "../game/game.action"; 

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        play: () => dispatch(play()),
        multiplayer: () => dispatch(multiplayer()),
        changeMode: (mode) => dispatch(changeMode(mode)),
        changeChoices: (choices) => dispatch(changeChoices(choices)),
    }
  }
  

class Menu extends Component  {

    render() {
        const { menu,  changeMode, changeChoices, play ,multiplayer } = this.props
        return (
                <div>
                    <h1>Anime Song Trivia</h1>
                    <button onClick={play}>Play</button>
                    <br/>
                    <br/>
                    <button onClick={multiplayer}>Multiplayer</button>
                    <br/>
                    <h2>Points Multiplier: {menu.pointsMultiplier}x</h2>
                    <br />
                    <br />
                    <div>
                        <h3>Mode: {menu.mode} ({menu.modeMultiplier}x)</h3>
                        <button onClick={() => changeMode("visible")}>Visible</button>
                        <button onClick={() => changeMode("hidden")}>Hidden</button>
                        <h3>Choices: {menu.choices} ({menu.choicesMultiplier}x)</h3>
                        <button onClick={() => changeChoices(4)}>Few</button>
                        <button onClick={() => changeChoices(8)}>Many</button>
                    </div>
                </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);