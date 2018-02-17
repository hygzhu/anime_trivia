import React from 'react';
import VideoPlayer from "./video-player"
import AnimeList from '../../resources/animelist.json';
import {NotificationContainer, NotificationManager} from 'react-notifications';

class TextAnswer extends React.Component{
    render (){
            return(
                <div>
                    <input type="text"/>
                    <button onClick={this.onSubmit.bind(this)}>Submit</button>
                </div>
            );
        }
}


export default class SubmitForm extends React.Component{

    constructor(props){
        super(props);

        const animelist = AnimeList;
        const total = animelist.length;
        const randAnime = Math.floor((Math.random() * total) + 1);
        const newAnime = animelist[randAnime];
        console.log(newAnime);

        this.state = {
            multipleChoice: true,
            score: 0,
            animeName: newAnime["source"],
            title: newAnime["title"],
            songName: newAnime["song"] ? newAnime["song"]["title"] : null,
            songArtist: newAnime["song"] ? newAnime["song"]["artist"] : null,
            filename: "http://openings.moe/video/" + animelist[randAnime]["file"]
        };
    }

    createNotification(type){
        if(type == "success"){
            return(
                NotificationManager.success('Correct')
            );
        }else{
            return(
                NotificationManager.error('Wrong')
            );
        }
        
    }

    render(){

        const optionsCount = 4;
        const totalAnime = 1404;

        var randomOptions = [];
        for (var i = 0; i < optionsCount; i++){
            var index = Math.floor((Math.random() * totalAnime) + 1);
            randomOptions.push(AnimeList[index]["source"]);
        }

        randomOptions[Math.floor((Math.random() * optionsCount))] = this.state.animeName;

        var randomButtons = [];
        for (var i =0; i<optionsCount; i++){
            randomButtons.push(
                <button key={i} onClick={this.submitAnswer.bind(this, randomOptions[i])}>{randomOptions[i]}</button>
            );
        }

        console.log(randomOptions);

        return(
            <div>
                <h1>{"Score: "  + this.state.score}</h1>
                {randomButtons}
                <NotificationContainer/>
                <VideoPlayer filename={this.state.filename} />
            </div>
        );
    }

    onSubmit(){
        this.setState({ score: this.state.score +  1});
    }

    submitAnswer(answer){
        const animelist = AnimeList;
        const total = animelist.length;
        const randAnime = Math.floor((Math.random() * total) + 1);
        const newAnime = animelist[randAnime];
        console.log(newAnime);

        if(answer == this.state.animeName){

            this.createNotification("success");

            this.setState({
                animeName: newAnime["source"],
                title: newAnime["title"],
                songName: newAnime["song"] ? newAnime["song"]["title"] : null,
                songArtist: newAnime["song"] ? newAnime["song"]["artist"] : null,
                filename: "http://openings.moe/video/" + animelist[randAnime]["file"],
                score: this.state.score +  1
            });
        }else{

            this.createNotification("fail");

            this.setState({
                animeName: newAnime["source"],
                title: newAnime["title"],
                songName: newAnime["song"] ? newAnime["song"]["title"] : null,
                songArtist: newAnime["song"] ? newAnime["song"]["artist"] : null,
                filename: "http://openings.moe/video/" + animelist[randAnime]["file"]
            });
        }
        
    }
}