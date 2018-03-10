import React, { Component } from 'react';
import { connect } from "react-redux";
import "./trivia.component.css"; // Styles
import { changeSong } from "./trivia.action"; 

import VideoPlayer from "./video-player"
import AnimeList from './animelist.json';
import MultipleChoice from "./multiplechoice"
import { Grid, Row, Col } from "react-bootstrap"
import { NotificationContainer, NotificationManager } from 'react-notifications';

const mapStateToProps = (state) => {
    return {
      game: state.game,
      menu: state.menu,
      trivia: state.trivia
    }
  }
  
  const mapDispatchToProps = (dispatch) => {
    return {
      changeSong: (animeName, title, songName, songArtist, filename) => dispatch(changeSong(animeName, title, songName, songArtist, filename)),
    }
  }


class Trivia extends Component  {

    newSong(){
      const total = AnimeList.length;
      const randAnime = Math.floor((Math.random() * total) + 1);
      const newAnime = AnimeList[randAnime];
      this.props.changeSong(newAnime["source"], 
                newAnime["title"], 
                newAnime["song"] ? newAnime["song"]["title"] : null,
                newAnime["song"] ? newAnime["song"]["artist"] : null,
                "http://openings.moe/video/" + AnimeList[randAnime]["file"]);
    }

    componentWillMount(){
      this.newSong();
    }

    render() {
       return(
        <div>
        <Grid>
            <Row>
                <h1>Anime Trivia</h1>
            </Row>
            <Row>
                <Col xs={6} md={4}>
                    <h3>Mode: {this.props.menu.mode}<br/>Multiplier: {this.props.menu.pointsMultiplier}x</h3>
                </Col>
                <Col xs={6} md={4}>
                </Col>
                <Col xs={6} md={4}>
                <h3>{"Score: " + this.props.game.score}<br />{"Lives: " + this.props.game.lives}</h3>
                </Col>
            </Row>
            <Row>
              <MultipleChoice/>
            </Row>
            <Row>
              <VideoPlayer/>
            </Row>
        </Grid>
    </div>
    );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Trivia);