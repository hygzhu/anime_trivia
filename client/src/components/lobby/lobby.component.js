import React, { Component } from 'react';
import { connect } from "react-redux";
import "./lobby.component.css"; // Styles
import { userJoined } from "../lobby/lobby.action"; 

const mapStateToProps = (state) => {
    return {
        lobby: state.lobby
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
        userJoined: (name) => dispatch(userJoined(name)),
    }
  }
  
const sessionList = (sessions) => {
    return(sessions.map((session) => <li key={session}><h3>{session}</h3></li>));
}

class Lobby extends Component  {

    render() {
        const { userJoined, lobby } = this.props;
        
            if(lobby.active){
                return(
                <div>
                    <h1>Lobby active</h1>
                    <ul>{sessionList(lobby.sessions)}</ul>
                </div>);
            }else{
                return(
                <div>
                    <button onClick={() => userJoined("test")}>Create Lobby</button>
                    <br/>
                    <br/>
                    <button onClick={() => userJoined("test")}>Join a lobby</button>
                </div>);
            }
          
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Lobby);