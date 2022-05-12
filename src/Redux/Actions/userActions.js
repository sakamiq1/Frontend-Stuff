import { UserActionType } from "../Constants/actionConstants";

export const logInRequest = (loginResponse) => {
  return {
    type: UserActionType.LOG_IN,
    payload: loginResponse
  };
};