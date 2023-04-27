import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postUserService from "./postUserService";

//Get user from local storage
const postUser = localStorage.getItem("postUser");

const initialState = {
  postUser: postUser ? JSON.parse(postUser) : null,
  isPending: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const getPostUser = createAsyncThunk(
  "auth/getPostUser",
  async (userId, thunkAPI) => {
    try {
      return await postUserService.getPostUserById(userId);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postUserSlice = createSlice({
  name: "postUser",
  initialState,
  reducers: {
    reset: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(getPostUser.pending, (state) => {
        state.isPending = true;
        state.isSuccess = false;
      })
      .addCase(getPostUser.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getPostUser.rejected, (state, action) => {
        state.isPending = false;
        state.isError = true;
        state.isSuccess = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = postUserSlice.actions;
export default postUserSlice.reducer;
