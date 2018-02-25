import React from 'react';

export default class Score extends React.Component {

    changeState(newState) {
        this.props.changeState(newState);
    }

    render() {
        return (
            <div>
                    <h1>congratulations</h1>
                    <h2>Your score was: {this.props.score}</h2>
                    <button
                        onClick={this.changeState.bind(this, "menu")}>Back to menu</button>
            </div>
        );
    }
}