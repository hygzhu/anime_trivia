import firebase from './firebase.js';
import React, { Component } from 'react';

export default class Background extends Component {

    constructor(props){
        super(props);

        //hacky way to get an image from my firebase storage each time
        
        this.state = { url: ''}

        let image_num = Math.floor(Math.random() * 359) + 1;

        const refs = firebase.storage().ref(image_num+'.jpg');
        refs.getDownloadURL().then(function(x) {
            this.setState({url: x})    
        }.bind(this));

    }

    render(){
        return <div style={{position:"absolute", display: "flex", width: "100vw", height: "100vh", "zIndex": -1}}>
            <img style={{height: "auto", width:"10000px", backgroundSize: "cover"}} src={this.state.url}/>
        </div>
    }
}