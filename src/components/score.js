import React from 'react';

export default class Score extends React.Component {
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

    changeState(newState) {
        this.props.changeState(newState);
    }
}