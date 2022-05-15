import { UserActionType } from "../Constants/actionConstants";

const INIT_STATE = {
  isLoggedIn: false,
  user: {
    isSuccess: false,
    message: "Wrong password",
    resultItem: {},
    results: null,
  },
};

export const UserReducers = (state = INIT_STATE, { type, payload }) => {
  switch (type) {
    case UserActionType.LOG_IN:
      return { ...state, user: { ...payload }, isLoggedIn: payload.isSuccess };

    default:
      return state;
  }
};
