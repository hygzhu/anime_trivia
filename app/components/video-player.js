import React from 'react';
import ReactPlayer from 'react-player';

export default class VideoPlayer extends React.Component{
    
    constructor(props){
        super(props);

        this.state = {
            filename: this.props.filename
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
                width='100%'
                height='100vh'
                playing
                loop
                />
            </div>
        );
    }
}