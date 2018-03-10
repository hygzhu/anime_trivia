import { combineReducers } from "redux";

// Import reducers:
import menu from "../components/menu/menu.reducer";
import game from "../components/game/game.reducer";
import trivia from "../components/trivia/trivia.reducer";
import score from "../components/score/score.reducer";

const rootReducer = combineReducers({
  game, menu, trivia, score
})

export default rootReducer;
