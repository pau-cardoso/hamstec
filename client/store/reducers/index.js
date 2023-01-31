import { combineReducers } from "redux";
import { projectReducer } from "./ProjectReducer";

const rootReducer = combineReducers({
  projectReducer,
});

export default rootReducer;