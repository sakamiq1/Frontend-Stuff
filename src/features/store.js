import { configureStore } from "@reduxjs/toolkit";
import toolReducer from "./tools/toolSlice";
import detailReducer from "./details/detailSlice";
import userReducer from "./user/userSlice";

const reducer = {
  tools: toolReducer,
  details: detailReducer,
  user: userReducer,
};

export const store = configureStore({
  reducer: reducer,
});
