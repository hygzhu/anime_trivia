import React, { Component } from 'react';
import { connect } from "react-redux";
import { changeMode, changeChoices} from "./menu.action"; 
import { menuScreen } from "../game/game.action";

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        menuScreen: () => dispatch(menuScreen()),
        changeMode: (mode) => dispatch(changeMode(mode)),
        changeChoices: (choices) => dispatch(changeChoices(choices)),
    }
  }
  

class Settings extends Component  {

    render() {
        const { menu,  changeMode, changeChoices, menuScreen } = this.props
        return (
                <div>
                    <h1 style={{margin: 0}}>Settings</h1>
                    <br/>
                    <br/>
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
                    <br/>
                    <button onClick={() => menuScreen()}>Back to Menu</button>
                </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);