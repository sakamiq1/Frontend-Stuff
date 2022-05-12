import { ActionType } from "../Constants/actionConstants";

export const getListTool = (tools) => {
  return {
    type: ActionType.GET_TOOLS,
    payload: tools,
  };
};

export const editToolDetails = (tool) => {
  return {
    type: ActionType.EDIT_TOOL_DETAILS,
    payload: tool,
  };
};

export const getToolDetails = (tool) => {
  return {
    type: ActionType.GET_TOOL_DETAILS,
    payload: tool,
  };
};

export const createTool = (tool) => {
  return{
    type: ActionType.CREATE_TOOL,
    payload: tool
  }
}

