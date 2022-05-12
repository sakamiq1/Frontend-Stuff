import { combineReducers } from "redux";
import { toolReducer, detailReducer } from "./productReducers";
import { UserReducers } from "./userReducers";

const reducer = combineReducers({
  allTools: toolReducer,
  details: detailReducer,
  User: UserReducers
});

export default reducer;
