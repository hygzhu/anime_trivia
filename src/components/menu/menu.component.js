import React, { Component } from 'react';
import { connect } from "react-redux";
import "./menu.component.css"; // Styles
import { changeMode, changeChoices, play } from "./menu.action"; // Actions

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        play: () => dispatch(play()),
        changeMode: () => dispatch(changeMode()),
        changeChoices: () => dispatch(changeChoices()),
    }
  }
  

class Menu extends Component  {

    render() {
        const { menu, changeMode, changeChoices, play } = this.props
        return (
                <div>
                    <h1>Anime Song Trivia</h1>
                    <button onClick={play}>Play</button>
                    <h2>Points Multiplier: {this.props.menu.pointsMultiplier}x</h2>
                    <br />
                    <br />
                    <div>
                        <h3>Mode: {this.props.menu.mode} ({this.props.menu.modeMultiplier}x)</h3>
                        <button onClick={() => changeMode("test")}>Visible</button>
                        <button onClick={changeMode}>Hidden</button>
                        <h3>Choices: {this.props.menu.choices} ({this.props.menu.choicesMultiplier/ 4}x)</h3>
                        <button onClick={changeChoices}>Few</button>
                        <button onClick={changeChoices}>Many</button>
                    </div>
                </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);