import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import keyApi from '../../apis/keyApi'

const init_state = {}

export const fetchAllKeys = createAsyncThunk('key/fetchKeys', async () => {
  const response = await keyApi
    .get('danh-sach-key', {
      headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` },
    })
    .catch((err) => console.log(err))
  return response.data
})

export const deleteKey = createAsyncThunk('key/deleteKeys', async (id) => {
  const response = await keyApi
    .put('xoa-key', id, {
      headers: { Authorization: `Bearer ${localStorage.getItem('Token')}` },
    })
    .catch((err) => console.log(err))
  return response.data
})

const keySlice = createSlice({
  name: 'key',
  initialState: init_state,
  extraReducers: {
    [fetchAllKeys.fulfilled]: (state, { payload }) => {
      return { ...state, key: payload.results }
    },
    [deleteKey.fulfilled]: (state, action) => {
      return {
        ...state,
        key: state.key.map((key) =>
          key.id === action.meta.arg.id ? { ...key, status: -2 } : key,
        ),
      }
    },
  },
})

export const getAllKeys = (state) => state.key.key
export default keySlice.reducer
