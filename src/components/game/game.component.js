import React, { Component } from 'react';
import { connect } from "react-redux";
import "./game.component.css"; // Styles
import { changeMode } from "./game.action"; // Actions
import Menu from "../menu/menu.component.js"

const mapStateToProps = (state) => {
    return {
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        changeMode: (mode) => dispatch(changeMode(mode)),
    }
  }
  

class Game extends Component  {

    render() {
        const { game } = this.props
        console.log(this.props);
        return (
            <div>
                <h1>{1}</h1>
                <Menu/>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Game, Menu);