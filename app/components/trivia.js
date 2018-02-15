import React from 'react';
import VideoPlayer from "./video-player"
import AnimeList from '../../resources/animelist.json';

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
            filename: "../../resources/Ending1-Konosuba.webm"
            //this.state.filename: "http://openings.moe/video/" + animelist[randAnime]["file"]
        };
    }

    render(){
        console.log(this.state.filename + "LOL");
        return(
            <div>
                <h1>{"Score: "  + this.state.score}</h1>
                <div>
                    <button onClick={this.submitAnswer.bind(this)}>Anime1</button>
                    <button onClick={this.submitAnswer.bind(this)}>Anime2</button>
                    <button onClick={this.submitAnswer.bind(this)}>Anime3</button>
                    <button onClick={this.submitAnswer.bind(this)}>Anime4</button>
                </div>
                <VideoPlayer filename={this.state.filename} />
            </div>
        );
    }

    onSubmit(){
        this.setState({ score: this.state.score +  1});
    }

    submitAnswer(){
        console.log("clicked");
        this.setState({filename: "../../resources/Opening1-SteinsGate.webm"});
    }
}