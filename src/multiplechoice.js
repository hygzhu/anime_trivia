import React from 'react';
import AnimeList from './animelist.json';

const buttonStyle = {
    backgroundColor: "rgb(23, 171, 190)",
    color: "#ffffff",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration : "none",
    display: "inline-block",
    fontSize: "16px",
    border: "1px solid white"
};

export default class MultipleChoice extends React.Component{

    submitAnswer(answer){
        this.props.submitAnswer(answer);
    }

    render (){
        const optionsCount = this.props.choices;
        const totalAnime = 1404;

        var randomOptions = [];
        for (var i = 0; i < optionsCount; i++){
            var index = Math.floor((Math.random() * totalAnime) + 1);
            var newAnime = AnimeList[index]["source"];
            //prevents duplicates
            while(newAnime == this.props.animeName || randomOptions.includes(newAnime)){
                index = Math.floor((Math.random() * totalAnime) + 1);
                newAnime = AnimeList[index]["source"];
            }
            randomOptions.push(newAnime);
        }


        randomOptions[Math.floor((Math.random() * optionsCount))] = this.props.animeName;

        var randomButtons = [];
        for (var j =0; j<optionsCount; j++){
            randomButtons.push(
                <button style={buttonStyle} key={j} onClick={this.submitAnswer.bind(this, randomOptions[j])}>{randomOptions[j]}</button>
            );
        }

        return(
            <div>
                {randomButtons}
            </div>
        );
    }
}