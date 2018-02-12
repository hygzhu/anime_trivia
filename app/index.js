var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App');
var ReactPlayer = require('react-player');

const test = (
    <div>
        <App/>
    </div>
);

ReactDOM.render(
    test,
    document.getElementById('app'),
);

