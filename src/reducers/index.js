import { combineReducers } from "redux";

// Import reducers:
import menu from "../components/menu/menu.reducer";
import game from "../components/game/game.reducer";
import trivia from "../components/trivia/trivia.reducer";

const rootReducer = combineReducers({
  game, menu, trivia
})

export default rootReducer;
