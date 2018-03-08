import React, { Component } from 'react';
import './app.css';

import Menu from './components/menu/menu.component';

export default class App extends Component {
  render () {
    return (
      <div style={{ textAlign: "center"}}>
        <Menu/>
      </div>
    )
  }
}
