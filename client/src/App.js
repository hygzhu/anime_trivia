import React, { Component } from 'react';
import './App.css';

import Game from './components/game/game.component';



export default class App extends Component {
  render () {

    return (
      <div style={{ textAlign: "center"}}>
        <Game/>
      </div>
    )
  }
}
