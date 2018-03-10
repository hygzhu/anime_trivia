import React from 'react';
import { connect } from "react-redux";
import AnimeList from './animelist.json';
import { submitScore, submitAnswer } from "./trivia.action"; 

const mapStateToProps = (state) => {
    return {
      menu: state.menu,
      trivia: state.trivia
    }
  }


const mapDispatchToProps = (dispatch) => {
    return {
        submitScore: (score) => dispatch(submitScore(score)),
        submitAnswer: (answer) => dispatch(submitAnswer(answer)),
    }
}
  

class MultipleChoice extends React.Component{

    checkAnswer(answer){
        console.log(answer + " "+ this.props.trivia.animeName);
        const { submitAnswer, submitScore} = this.props
        if(answer === this.props.trivia.animeName){
            console.log("submit Score");
            var score = 10 * this.props.menu.pointsMultiplier;
            submitAnswer(answer);
            submitScore(score);
        }
    }

    render (){
        const { menu, trivia} = this.props

        const optionsCount = menu.choices;
        const totalAnime = AnimeList.length;

        var randomOptions = [];
        for (var i = 0; i < optionsCount; i++){
            var index = Math.floor((Math.random() * totalAnime) + 1);
            var newAnime = AnimeList[index]["source"];
            //prevents duplicates
            while(newAnime == trivia.animeName || randomOptions.includes(newAnime)){
                index = Math.floor((Math.random() * totalAnime) + 1);
                newAnime = AnimeList[index]["source"];
            }
            randomOptions.push(newAnime);
        }


        randomOptions[Math.floor((Math.random() * optionsCount))] = trivia.animeName;

        var randomButtons = [];
        for (var j =0; j<optionsCount; j++){
            var answer = randomOptions[j]; //This needs to initialized or submitAnswer sends undefined
            randomButtons.push(
                <button key={j} onClick={() => this.checkAnswer(answer)}>{randomOptions[j]}</button>
            );
        }

        return(
            <div>
                {randomButtons}
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MultipleChoice);