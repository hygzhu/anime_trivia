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
                    <h1 style={{margin: 0}}>Anime Song Trivia</h1>
                    <br/>
                    <br/>
                    <h3>Single Player</h3>
                    <button onClick={play}>Play</button>
                    <h4>Settings</h4>
                    <h5>Points Multiplier: {menu.pointsMultiplier}x</h5>
                    <div>
                        <h5>Mode: {menu.mode} ({menu.modeMultiplier}x)</h5>
                        <button onClick={() => changeMode("visible")}>Visible</button>
                        <button onClick={() => changeMode("hidden")}>Hidden</button>
                        <h5>Choices: {menu.choices} ({menu.choicesMultiplier}x)</h5>
                        <button onClick={() => changeChoices(4)}>Few</button>
                        <button onClick={() => changeChoices(8)}>Many</button>
                    </div>
                    <br/>
                    <h3>Multiplayer</h3>
                    <button onClick={multiplayer}>Play</button>
                </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);