import React from 'react';
import VideoPlayer from "./video-player"
import AnimeList from './animelist.json';
import MultipleChoice from "./multiplechoice"
import { Grid, Row, Col } from "react-bootstrap"
import { NotificationContainer, NotificationManager } from 'react-notifications';


export default class SubmitForm extends React.Component {

    constructor(props) {
        super(props);

        const animelist = AnimeList;
        const total = animelist.length;
        const randAnime = Math.floor((Math.random() * total) + 1);
        const newAnime = animelist[randAnime];
        //console.log(newAnime);

        this.state = {
            score: 0,
            lives: 3,
            animeName: newAnime["source"],
            title: newAnime["title"],
            songName: newAnime["song"] ? newAnime["song"]["title"] : null,
            songArtist: newAnime["song"] ? newAnime["song"]["artist"] : null,
            filename: "http://openings.moe/video/" + animelist[randAnime]["file"]
        };
    }

    createNotification(type) {
        if (type == "success") {
            return (
                NotificationManager.success('Correct')
            );
        } else {
            return (
                NotificationManager.error('Wrong')
            );
        }

    }

    submitAnswer(answer) {
        const animelist = AnimeList;
        const total = animelist.length;
        const randAnime = Math.floor((Math.random() * total) + 1);
        const newAnime = animelist[randAnime];
        //console.log(newAnime);
        if (answer == this.state.animeName) {

            this.createNotification("success");
            this.setState({
                animeName: newAnime["source"],
                title: newAnime["title"],
                songName: newAnime["song"] ? newAnime["song"]["title"] : null,
                songArtist: newAnime["song"] ? newAnime["song"]["artist"] : null,
                filename: "http://openings.moe/video/" + animelist[randAnime]["file"],
                score: this.state.score + 10 * this.props.multiplier
            });
        } else if (answer != this.state.animeName && this.state.lives > 1) {

            this.createNotification("fail");
            this.setState({
                animeName: newAnime["source"],
                title: newAnime["title"],
                songName: newAnime["song"] ? newAnime["song"]["title"] : null,
                songArtist: newAnime["song"] ? newAnime["song"]["artist"] : null,
                filename: "http://openings.moe/video/" + animelist[randAnime]["file"],
                lives: this.state.lives - 1
            });
        } else {
            this.props.scoreCallback(this.state.score);
        }

    }

    render() {
        //console.log(randomOptions);

        return (
            <div>
                <Grid>
                    <Row>
                        <h1>Anime Trivia</h1>
                    </Row>
                    <Row>
                        <Col xs={6} md={4}>
                            <h3>Mode: {this.props.mode}<br/>Multiplier: {this.props.multiplier}x</h3>
                        </Col>
                        <Col xs={6} md={4}>
                        </Col>
                        <Col xsHidden md={4}>
                        <h3>{"Score: " + this.state.score}<br />{"Lives: " + this.state.lives}</h3>
                        </Col>
                    </Row>
                    <Row>
                        <MultipleChoice choices={this.props.choices} animeName={this.state.animeName} submitAnswer={this.submitAnswer.bind(this)} />
                    </Row>
                    <Row>
                        <VideoPlayer filename={this.state.filename} mode={this.props.mode} />
                    </Row>
                </Grid>
                <NotificationContainer />
            </div>
        );
    }
}