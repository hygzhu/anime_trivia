import React from 'react';
export default class SubmitForm extends React.Component{

    constructor(props){
        super(props);
        console.log(this.props.anime);
        this.state = {
            multipleChoice: true,
            score: 0,
            animeName: this.props.anime["source"],
            title: this.props.anime["title"],
            songName: this.props.anime["song"] ? this.props.anime["song"]["title"] : null,
            songArtist: this.props.anime["song"] ? this.props.anime["song"]["artist"] : null
        };
    }

    renderMultipleChoice(){
        if(this.state.multipleChoice){
            
        }
    }

    render(){
        console.log(this.state.animeName);
        return(
            <div>
            <h1>{"Score: "  + this.state.score}</h1>
            <div><input type="text"/>
            <button onClick={this.onSubmit.bind(this)}>Submit</button>
            </div>
            </div>
        );
    }

    onSubmit(){
        this.setState({ score: this.state.score +  1});
    }
}