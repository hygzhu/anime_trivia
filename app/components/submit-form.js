import React from 'react';
import { Button, Navbar, Input } from 'react-materialize';

export default class SubmitForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            score: 0,
            answer: this.props.answer
        };
    }
    
    render(){
        return(
            <div>
            <Navbar className="grey darken-4" brand={"Score: "  + this.state.score}></Navbar>
            <Input placeholder="Anime Title" s={6}/>
            <Button waves='light' onClick={this.onSubmit.bind(this)}>Submit</Button>
            </div>
        );
    }

    onSubmit(){
        this.setState({ score: this.state.score +  1});
    }
}