import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toolApi from "../../apis/toolApi";

export const fetchDetailAsync = createAsyncThunk(
  "details/fetchDetails",
  async (id) => {
    const response = await toolApi.get(`/chi-tiet?id=${id}`);
    return response.data;
  }
);

const init_state = {
  details: {},
};

const detail_slice = createSlice({
  name: "details",
  initialState: init_state,
  reducers: {
    removeSelectedTools: (state) => {
      state.details = {};
    },
  },
  extraReducers: {
    [fetchDetailAsync.fulfilled]: (state, { payload }) => {
      console.log("full filled...");
      return { ...state, details: payload };
    },
  },
});

export const getDetail = (state) => state.details.details;
export const { removeSelectedTools } = detail_slice.actions;
export default detail_slice.reducer;
