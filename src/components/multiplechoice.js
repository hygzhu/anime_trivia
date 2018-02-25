import React from 'react';
import AnimeList from '../../resources/animelist.json';

export default class MultipleChoice extends React.Component{
    render (){
        const optionsCount = this.props.choices;
        const totalAnime = 1404;

        var randomOptions = [];
        for (var i = 0; i < optionsCount; i++){
            var index = Math.floor((Math.random() * totalAnime) + 1);
            randomOptions.push(AnimeList[index]["source"]);
        }


        randomOptions[Math.floor((Math.random() * optionsCount))] = this.props.animeName;

        var randomButtons = [];
        for (var i =0; i<optionsCount; i++){
            randomButtons.push(
                <button key={i} onClick={this.submitAnswer.bind(this, randomOptions[i])}>{randomOptions[i]}</button>
            );
        }

        return(
            <div>
                {randomButtons}
            </div>
        );
    }

    submitAnswer(answer){
        this.props.submitAnswer(answer);
    }
}