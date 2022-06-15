import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
import userApi from "../../apis/userApi";

export const logIn = createAsyncThunk("user/log_in", async (input) => {
  const response = await userApi
    .post("dang-nhap", input)
    .catch((err) => console.log(err));
  return response.data;
});

export const signUp = createAsyncThunk("user/sign_up", async (input) => {
  const response = await userApi
    .post("dang-ki", input)
    .catch((err) => console.log(err));
  return response.data;
});

export const logOut = createAsyncThunk("/user/logOut", () => {
  return {};
});

const init_state = {
  user: {},
};

const user_slice = createSlice({
  name: "user",
  initialState: init_state,
  extraReducers: {
    [logIn.fulfilled]: (state, { payload }) => {
      if (payload.isSuccess) {
        localStorage.setItem("Token", payload.resultItem.value.token);
        localStorage.setItem("User", payload.resultItem.value.username);
        localStorage.setItem(
          "Role",
          payload.resultItem.value.isAdmin ? "admin" : "member"
        );
        message.success("successful log in");
        return { ...state, user: payload };
      } else {
        message.error(payload.message);
      }
    },
    [signUp.fulfilled]: (state, { payload }) => {
      payload.isSuccess
        ? message.success("register successful")
        : message.error(payload.message);
    },
    [logOut.fulfilled]: (state, { payload }) => {
      return { user: {} };
    },
  },
});

export const getLoginStatus = (state) => state.user.user;
export default user_slice.reducer;
