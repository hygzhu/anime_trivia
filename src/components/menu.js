import React from 'react';

export default class Menu extends React.Component {

    render() {
        return (
            <div>
                <div>
                    <h1>Anime Song Trivia</h1>
                    <button onClick={this.changeState.bind(this, "trivia")}>Play</button>
                    <h2>Points Multiplier: {this.props.multiplier}x</h2>
                    <br />
                    <br />
                    <div>
                        <h3>Mode: {this.props.mode}({this.props.modeMultiplier}x)</h3>
                        <select onChange={this.changeMode.bind(this)}>
                            <option value="visible">visible</option>
                            <option value="hidden">hidden</option>
                        </select>
                        <h3>Choices: {this.props.choices}({this.props.choicesMultiplier/ 4}x)</h3>
                        <select onChange={this.setChoices.bind(this)}>
                            <option value={4}>Few</option>
                            <option value={8}>Many</option>
                        </select>
                    </div>
                </div>
            </div>
        );
    }

    changeState(newState) {
        this.props.changeState(newState);
    }

    changeMode(event) {
        this.props.setMode(event.target.value);
    }

    setChoices(event) {
        this.props.setChoices(event.target.value);
    }
}

