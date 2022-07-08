import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { message } from 'antd'
import userApi from '../../apis/userApi'

export const logIn = createAsyncThunk('user/log_in', async (input) => {
  const response = await userApi
    .post('dang-nhap', input)
    .catch((err) => console.log(err))
  return response.data
})

export const signUp = createAsyncThunk('user/sign_up', async (input) => {
  console.log(input)
  const response = await userApi
    .post('dang-ki', { IsAdmin: false, ...input, IsDeleted: false })
    .catch((err) => console.log(err))
  return response.data
})

export const logOut = createAsyncThunk('/user/logOut', () => {
  return {}
})

export const fetchUserInfo = createAsyncThunk(
  'user/fetchUserInfo',
  async (username) => {
    const response = await userApi
      .get(`chi-tiet/${username}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` },
      })
      .catch((err) => console.log(err))
    return response.data
  },
)

const init_state = {
  user: {},
}

const user_slice = createSlice({
  name: 'user',
  initialState: init_state,
  extraReducers: {
    [logIn.fulfilled]: (state, { payload }) => {
      if (payload.isSuccess) {
        localStorage.setItem('Token', payload.resultItem.value.token)
        localStorage.setItem('User', payload.resultItem.value.user.username)
        localStorage.setItem(
          'Role',
          payload.resultItem.value.user.isAdmin ? 'admin' : 'member',
        )
        message.success('successful log in')
        return { ...state, user: payload }
      } else {
        message.error(payload.message)
      }
    },
    [signUp.fulfilled]: (state, { payload }) => {
      payload.isSuccess
        ? message.success('register successful')
        : message.error(payload.message)
    },
    [signUp.rejected]: (state, { payload }) => {
      console.log(payload)
    },
    [logOut.fulfilled]: (state, { payload }) => {
      return { user: {} }
    },
    [fetchUserInfo.fulfilled]: (state, { payload }) => {
      return { ...state, userDetail: payload.resultItem }
    },
  },
})

export const getUserInformation = (state) => state.user.userDetail
export const getLoginStatus = (state) => state.user.user
export default user_slice.reducer
