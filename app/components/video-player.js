import React from 'react';
import ReactPlayer from 'react-player';
import AnimeList from '../../resources/animelist.json';
import SubmitForm from './submit-form'

export default class VideoPlayer extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            filename: "",
            anime: null
        };
    }

    getVideo(){
        const animelist = AnimeList;
        const total = animelist.length;
        const randAnime = Math.floor((Math.random() * total) + 1);
        //console.log(animelist[randAnime]);
        this.state.filename = "http://openings.moe/video/" + animelist[randAnime]["file"];
        this.state.anime = animelist[randAnime];
    }

    
    render(){
        this.getVideo();
        console.log(this.state.filename);
        return(
            <div>
                <SubmitForm score={0} anime={this.state.anime}/>
                <ReactPlayer 
                url={this.state.filename}
                width='100%'
                height='100vh'
                playing
                loop
                />
            </div>
        );
    }
}