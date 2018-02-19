import React from 'react';
import ReactPlayer from 'react-player';

export default class VideoPlayer extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            filename: this.props.filename,
            playerSize: this.props.mode == "visible" ? 100 : 0
        };
    }

    componentWillReceiveProps(nextProps){
        this.setState({filename: nextProps.filename});
    }
    
    render(){
        console.log(this.state.filename);
        return(
            <div>
                <ReactPlayer 
                url={this.state.filename}
                width= {this.state.playerSize +'%'}
                height= {this.state.playerSize + 'vh'}
                playing
                loop
                />
            </div>
        );
    }
}