import { applyMiddleware, createStore } from "redux";
import io from "socket.io-client"
// Middleware:
import logger from "redux-logger";
import thunkMiddleware from 'redux-thunk';
import socketIO from './middleware/socket-middleware'

// Reducers:
import rootReducer from "./reducers/index";

const initialState = {
      game: {
        score: 0,
        lives: 3,
        screen: "menu"
      },
      menu: {
        mode: "visible",
        choices: 4,
        pointsMultiplier: 1,
        modeMultiplier: 1,
        choicesMultiplier:1
      },
      trivia: {
        animeName: "",
        title: "",
        songName: "",
        songArtist: "",
        filename: ""
      },
      score:{
        scoreSubmitted: false,
      },
      lobby:{
        loading: false,
      }
};

const socket = io.connect('http://localhost:4001', {reconnection: false});

const middleware = applyMiddleware(thunkMiddleware, logger, socketIO(socket));
const store = createStore(rootReducer, initialState, middleware);

// makes an object of the form {USERJOINED: 'USERJOINED'}
export const messageTypes = [
  'LOADROOM',
  'USERJOINED',
  'USERDISCONNECT',
  'JOINROOMFAILED',
  'NEWMESSAGE'
].reduce((accum, msg) => {
  accum[ msg ] = msg
  return accum
}, {})


//Adds listeners to socket messages so they can be dispatched as actions
Object.keys(messageTypes).forEach(type => socket.on(type, (payload) => store.dispatch({ type, payload })));

if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  })
}

export default store;
