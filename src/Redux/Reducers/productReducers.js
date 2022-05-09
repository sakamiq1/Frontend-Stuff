import { ActionType } from "../Constants/actionConstants";

const INIT_STATE = {
  tools: [],
};

export const toolReducer = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case ActionType.GET_TOOLS:
      return { ...state, tools: payload };
    case ActionType.EDIT_TOOL_DETAILS:
      return { ...state,...payload };
    default:
      return state;
  }
};

export const detailReducer = (state = {}, { type, payload }) => {
  switch (type) {
    case ActionType.GET_TOOL_DETAILS:
      return { ...state, ...payload };

    default:
      return state;
  }
};