import React, { Component } from 'react';
import { connect } from "react-redux";
import "./menu.component.css"; // Styles
import { play, multiplayer, settings } from "../game/game.action"; 

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        play: () => dispatch(play()),
        multiplayer: () => dispatch(multiplayer()),
        settings: () => dispatch(settings()),
    }
  }
  

class Menu extends Component  {

    render() {
        const { play ,multiplayer, settings } = this.props
        return (
                <div>
                    <h1 style={{margin: 0}}>Anime Song Trivia</h1>
                    <br/>
                    <br/>
                    <h3>Single Player</h3>
                    <button onClick={play}>Play</button>
                    <br/>
                    <br/>
                    <h3>Multiplayer</h3>
                    <button onClick={multiplayer}>Play</button>
                    <br/>
                    <br/>
                    <h3>Settings</h3>
                    <button onClick={settings}>Settings</button>
                </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu);