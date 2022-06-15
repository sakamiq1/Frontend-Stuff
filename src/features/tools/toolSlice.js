import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import toolApi from "../../apis/toolApi";

export const fetchToolsAsync = createAsyncThunk(
  "tools/fetchTools",
  async () => {
    const response = await toolApi
      .get("/danh-sach-tool")
      .catch((err) => console.log(err));
    return response.data;
  }
);

export const addToolAsync = createAsyncThunk("tools/addTool", async (data) => {
  const response = await toolApi
    .post("/them-tool", data)
    .catch((err) => console.log(err));
  return response.data;
});

export const editToolAsync = createAsyncThunk(
  "tools/editTool",
  async (data) => {
    const response = await toolApi
      .put(`sua-tool`, data)
      .catch((err) => console.log(err));
    return response.data;
  }
);

export const deleteToolAsync = createAsyncThunk(
  "tools/deleteTool",
  async (id) => {
    const response = await toolApi
      .delete(`xoa-tool?id=${id}`)
      .catch((err) => console.log(err));
    return response.data;
  }
);

const init_state = {
  tools: [],
};

const tool_slice = createSlice({
  name: "tools",
  initialState: init_state,
  reducers: {
    removeCurentTools: (state) => {
      state.tools = {};
    },
  },
  extraReducers: {
    [fetchToolsAsync.fulfilled]: (state, { payload }) => {
      console.log("full filled...");
      return { ...state, tools: payload };
    },
    [addToolAsync.fulfilled]: (state, { payload }) => {
      console.log("full filled...");
      return {
        tools: {
          ...state.tools,
          results: state.tools.results.concat(payload.data),
        },
      };
    },
    [editToolAsync.fulfilled]: (state, { payload }) => {
      console.log("full filled...");
      console.log(payload.data);
      return {
        tools: {
          ...state.tools,
          results: state.tools.results.map((tool) =>
            payload.data.id === tool.id ? payload.data : tool
          ),
        },
      };
    },
    [deleteToolAsync.fulfilled]: (state, { payload }) => {
      console.log("full filled...");
      return {
        tools: {
          ...state.tools,
          results: state.tools.results.filter(
            (item) => item.id !== payload.data.id
          ),
        },
      };
    },
  },
});

export const getTools = (state) => state.tools.tools;
export const { removeCurentTools } = tool_slice.actions;
export default tool_slice.reducer;
