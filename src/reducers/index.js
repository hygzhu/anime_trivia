import { combineReducers } from "redux";

// Import reducers:
import menu from "../components/menu/menu.reducer";
import game from "../components/game/game.reducer";

const rootReducer = combineReducers({
  game, menu,
})

export default rootReducer;
