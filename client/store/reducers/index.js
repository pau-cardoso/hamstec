import { combineReducers } from "redux";
import { projectReducer } from "./ProjectReducer";
import { quoteReducer } from "./QuoteReducer";

const rootReducer = combineReducers({
  projectReducer,
  quoteReducer,
});

export default rootReducer;