import React, { Component } from 'react';
import socketIOClient from 'socket.io-client'
import './App.css';

import Game from './components/game/game.component';



export default class App extends Component {
  render () {

    const socket = socketIOClient("http://localhost:4001")

    return (
      <div style={{ textAlign: "center"}}>
        <Game/>
      </div>
    )
  }
}
