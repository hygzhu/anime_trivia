import React from 'react';

const buttonStyle = {
    backgroundColor: "rgb(23, 171, 190)",
    color: "#ffffff",
    padding: "15px 32px",
    textAlign: "center",
    textDecoration : "none",
    display: "inline-block",
    fontSize: "16px",
    border: "1px solid white"
};

export default class Menu extends React.Component {

    changeState(newState) {
        this.props.changeState(newState);
    }

    changeMode(event) {
        this.props.setMode(event.target.value);
    }

    setChoices(event) {
        this.props.setChoices(event.target.value);
    }

    render() {
        return (
            <div>
                <div>
                    <h1>Anime Song Trivia</h1>
                    <button style={buttonStyle} onClick={this.changeState.bind(this, "trivia")}>Play</button>
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
}