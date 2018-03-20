import React, { Component } from 'react';
import './App.css';
import Background from './background'
import Game from './components/game/game.component';



export default class App extends Component {
  render () {

    return (
      <div style={{ textAlign: "center"}}>
        <Background/>
        <Game/>
      </div>
    )
  }
}
