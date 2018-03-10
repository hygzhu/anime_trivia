import React from 'react';
import AnimeList from './animelist.json';


class MultipleChoice extends React.Component{

    render (){
        const { choices, animeName, checkAnswer } = this.props

        const optionsCount = choices;
        const totalAnime = AnimeList.length;

        let randomOptions = [];
        for (let i = 0; i < optionsCount; i++){
            let index = Math.floor((Math.random() * totalAnime) + 1);
            let newAnime = AnimeList[index]["source"];
            //prevents duplicates
            while(newAnime == animeName || randomOptions.includes(newAnime)){
                index = Math.floor((Math.random() * totalAnime) + 1);
                newAnime = AnimeList[index]["source"];
            }
            randomOptions.push(newAnime);
        }


        randomOptions[Math.floor((Math.random() * optionsCount))] = animeName;

        let randomButtons = [];
        for (let j =0; j<optionsCount; j++){
            let answer = randomOptions[j]; //This needs to initialized or submitAnswer sends undefined
            randomButtons.push(
                <button key={j} onClick={() => checkAnswer(answer)}>{randomOptions[j]}</button>
            );
        }

        return(
            <div>
                {randomButtons}
            </div>
        );
    }
}

export default MultipleChoice;