import React, { Component } from 'react';
import { connect } from "react-redux";
import "./lobby.component.css"; // Styles
import { createLobby, joinLobby, nameChanged, lobbyNameChanged } from "../lobby/lobby.action";
import { Grid, Row, Col } from "react-bootstrap"

const mapStateToProps = (state) => {
    return {
        lobby: state.lobby
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createLobby: (name) => dispatch(createLobby(name)),
        joinLobby: (name, lobbyname) => dispatch(joinLobby(name, lobbyname)),
        nameChanged: (name) => dispatch(nameChanged(name)),
        lobbyNameChanged: (name) => dispatch(lobbyNameChanged(name)),
    }
}

const sessionList = (sessions, sessionID) => {
    return (sessions.map((session) => 
    <li key={session.id}><h3>{session.name}
        {session.name == undefined ? "No Name" : ""}
        {session.id == sessionID ? " (You)" : ""}</h3></li>));
}

class Lobby extends Component {

    render() {
        const { createLobby, joinLobby, nameChanged, lobbyNameChanged, lobby } = this.props;

        if (lobby.active) {
            return (
                <div>
                    <Grid>
                        <Row>
                            <h1>Lobby Name: {lobby.lobbyname}</h1>
                        </Row>
                        <Row>
                            <Col xs={6} md={4}>
                                <h2>Current Users:</h2>
                                <ul>{sessionList(lobby.sessions, lobby.sessionID)}</ul>
                            </Col>
                            <Col xs={6} md={4}><h1>Chat</h1></Col>
                            <Col xs={6} md={4}><h1>Other info</h1></Col>
                        </Row>
                    </Grid>
                </div>);
        } else if(lobby.loading){
           return( <h1>Lobby Loading</h1>
        );
        } else {
            return (
                <div>
                    <form>
                        <label>
                        <h2>Name: {lobby.name}</h2>
                            <input onChange={(e) => nameChanged(e.target.value)} type="text" />
                        </label>
                    </form>
                    <br />
                    <br />
                    <button onClick={() => createLobby(lobby.name)}>Create Lobby</button>
                    <br />
                    <br />
                    <form>
                        <label>
                        <h2>Lobby Link: {lobby.lobbyname}</h2>
                            <input onChange={(e) => lobbyNameChanged(e.target.value)} type="text" />
                        </label>
                    </form>
                    <br />
                    <br />
                    <button onClick={() => joinLobby(lobby.name, lobby.lobbyname)}>Join a lobby</button>
                </div>);
        }

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Lobby);