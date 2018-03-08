import { combineReducers } from "redux";

// Import reducers:
import menu from "../components/menu/menu.reducer";

const rootReducer = combineReducers({
  menu,
})

export default rootReducer;
