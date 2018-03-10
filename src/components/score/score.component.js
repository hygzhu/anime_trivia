import React, { Component } from 'react';
import { connect } from "react-redux";
import "./score.component.css"; // Styles
import { getHighscores, submitScore, changeName } from "../score/score.action";
import { menuScreen } from "../game/game.action";
import firebase from '../../firebase.js';

const mapStateToProps = (state) => {
    return {
        game: state.game,
        score: state.score
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getHighscores: (highscores, isHighscore, beatenScoreID) => dispatch(getHighscores(highscores, isHighscore, beatenScoreID)),
        menuScreen: () => dispatch(menuScreen()),
        submitScore: () => dispatch(submitScore()),
        changeName: (event) => dispatch(changeName(event.target.value)),
    }
}


class Score extends Component {

    //opens the highscore submission
    submitHighscore() {
        const { game, score } = this.props;
        if (score.isHighscore && !score.scoreSubmitted) {
            return (
                <div>
                    <h3>You got a high score!</h3>
                    <form onSubmit={this.submitHighScore.bind(this)}>
                        <input type="text" name="name" placeholder="Enter a Name" onChange={this.props.changeName} />
                        <button>Submit Score</button>
                    </form>
                </div>
            );
        }
    }

    //submits score
    submitHighScore(event) {
        event.preventDefault();

        const { score, game } = this.props;
        const highscoresRef = firebase.database().ref('highscore');
        if (score.beatenScoreID != null && score.beatenScoreID != "") {
            const scoreRef = firebase.database().ref("/highscore/" + score.beatenScoreID);
            scoreRef.remove();
        }
        const newScore = {
            name: score.name,
            score: game.score
        }
        highscoresRef.push(newScore);
        this.props.submitScore();
    }

    //updates highscore state with database data and check if score is highscore
    componentDidMount() {
        const { game } = this.props;
        const highscoresRef = firebase.database().ref('highscore');
        highscoresRef.on('value', (snapshot) => {
            let scores = snapshot.val();
            let newState = [];
            for (let score in scores) {
                newState.push({
                    id: score,
                    name: scores[score].name,
                    score: scores[score].score
                });
            }
            let isHighscore = false;
            let highscores = newState;
            let beatenScoreID = "";
            for (let i in highscores.sort((a, b) => {
                if (a.score < b.score) return 1;
                if (a.score > b.score) return -1;
                return 0;
            })) {
                if (highscores[i].score < game.score) {
                    if (highscores.length >= 10) {
                        beatenScoreID = highscores[i].id;
                        isHighscore = true;
                    }
                }
            }
            if (highscores.length < 10) {
                isHighscore = true;
            }
            this.props.getHighscores(newState, isHighscore, beatenScoreID);
        });   
    }

    render() {
        const { score, menuScreen } = this.props
        return (<div>
            <h1>congratulations</h1>
            <h2>Your score was: {this.props.game.score}</h2>
            <button onClick={() => menuScreen()}>Back to menu</button>

            {score.highscores == null ? <h1>No Highscore</h1> : this.submitHighscore()}
            <h1>High Scores</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th>
                    </tr>
                    {score.highscores == null ?
                        <tr >
                            <td>Loading</td>
                        </tr> :
                        score.highscores.sort((a, b) => {
                            if (a.score < b.score) return 1;
                            if (a.score > b.score) return -1;
                            return 0;
                        }).map((score, index) => {
                            return (
                                <tr key={score.id}>
                                    <td>{index + 1}</td>
                                    <td>{score.name}</td>
                                    <td>{score.score}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>

        </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Score);