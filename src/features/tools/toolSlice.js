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
    .post("/them-tool", data, {
      headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
    })
    .catch((err) => console.log(err));
  return response.data;
});

export const editToolAsync = createAsyncThunk(
  "tools/editTool",
  async (data) => {
    const response = await toolApi
      .put(`sua-tool`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      })
      .catch((err) => console.log(err));
    return response;
  }
);

export const deleteToolAsync = createAsyncThunk(
  "tools/deleteTool",
  async (id) => {
    const response = await toolApi
      .put(`xoa-tool`, id, {
        headers: { Authorization: `Bearer ${localStorage.getItem("Token")}` },
      })
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
          results: state.tools.results.concat(payload.resultItem),
        },
      };
    },
    [editToolAsync.fulfilled]: (state, { payload }) => {
      console.log("full filled...");
      return {
        tools: {
          ...state.tools,
          results: state.tools.results.map((tool) =>
            payload.data.resultItem.id === tool.id
              ? payload.data.resultItem
              : tool
          ),
        },
      };
    },
    [deleteToolAsync.fulfilled]: (state, action) => {
      console.log("full filled...");
      return {
        tools: {
          ...state.tools,
          results: state.tools.results.map((item) =>
            item.id === action.meta.arg.id ? { ...item, status: -2 } : item
          ),
        },
      };
    },
  },
});

export const getTools = (state) => state.tools.tools;
export const { removeCurentTools } = tool_slice.actions;
export default tool_slice.reducer;
