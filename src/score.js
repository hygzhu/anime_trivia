import React from 'react';
import firebase from './firebase.js';

export default class Score extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            name : "",
            highscores : [],
            beatenScoreID : null,
            scoreSubmitted: false
        }
    }

    //opens the highscore submission
    submitHighscore(){
        let isHighscore = false;
        let highscores = this.state.highscores;
        for(let i in highscores){
            if(highscores[i].score < this.props.score){
                if(highscores.length >= 10){
                    this.state.beatenScoreID = highscores[i].id;
                }
            }
        }
        if(highscores.length < 10){
            isHighscore = true;
        }
        if(isHighscore && !this.state.scoreSubmitted){
            return(
                <div>
                <h3>You got a high score!</h3>
                <form onSubmit={this.submitScore.bind(this)}>
                    <input type="text" name="name" placeholder="Enter a Name" onChange={this.handleChange.bind(this)}/>
                    <button>Submit Score</button>
                </form>
                </div>
                );
        }
    }

    changeState(newState) {
        this.props.changeState(newState);
    }

    //submits score
    submitScore(event) {
        event.preventDefault();
        const highscoresRef = firebase.database().ref('highscore');
        if(this.state.beatenScoreID !== null){
            const scoreRef = firebase.database().ref("/highscore/"+ this.state.beatenScoreID);
            scoreRef.remove();
        }
        const score = {
            name: this.state.name,
            score: this.props.score
        }
        highscoresRef.push(score);
        this.setState({scoreSubmitted : true});
      }

      //for name submission
      handleChange(event) {
        this.setState({name: event.target.value});
      }

      //updates highscore state with database data
      componentDidMount() {
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
          this.setState({
            highscores: newState
          });
        });
      }

    render() {
        return (
            <div>
                    <h1>congratulations</h1>
                    <h2>Your score was: {this.props.score}</h2>
                    <button
                        onClick={this.changeState.bind(this, "menu")}>Back to menu</button>

                    {this.submitHighscore()}

                    <h1>High Scores</h1>
                    <table>
                    <tbody>
                    <tr>
                        <th>Rank</th>
                        <th>Name</th>
                        <th>Score</th> 
                    </tr>
                        {this.state.highscores.sort((a,b)=>{
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