import React, { Component } from 'react';
import './app.css';

import Game from './components/Game/Game.component';



export default class App extends Component {
  render () {
    return (
      <div style={{ textAlign: "center"}}>
        <Game/>
      </div>
    )
  }
}
