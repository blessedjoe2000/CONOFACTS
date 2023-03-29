import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  isPending: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.createPost(postData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithVaue(message);
    }
  }
);

export const getPosts = createAsyncThunk(
  "posts/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getPosts(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithVaue(message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async (id, postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.updatePost(id, postData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithVaue(message);
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.deletePost(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithVaue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    reset: (state) => {
      state = { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isPending = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isPending = false;
        state.posts.push(action.payload);
        state.message = "post created sucessfully";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.message = action.payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isPending = false;
        state.isError = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.message = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.isPending = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isPending = false;
        state.posts = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.message = action.payload;
      })

      .addCase(deletePost.pending, (state) => {
        state.isPending = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isPending = false;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
