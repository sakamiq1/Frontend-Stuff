import { combineReducers } from "redux";
import { toolReducer, detailReducer } from "./productReducers";

const reducer = combineReducers({
  allTools: toolReducer,
  details: detailReducer,
});

export default reducer;
