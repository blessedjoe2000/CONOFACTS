import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  isPending: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      const response = await postService.createPost(postData, token);
      return response.data;
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllPosts = createAsyncThunk(
  "posts/getAllPost",
  async (_, thunkAPI) => {
    try {
      return await postService.getAllPosts();
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getUserPosts = createAsyncThunk(
  "posts/getUserPosts",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.getUserPosts(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getPostById = createAsyncThunk(
  "posts/getPostById",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;

      return await postService.getPostById(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePost = createAsyncThunk(
  "posts/update",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.updatePost(postData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
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
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deleteUserPosts = createAsyncThunk(
  "posts/deleteUserPost",
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await postService.deleteUserPosts(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    resetPost: (state) => initialState,
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
        state.message = "post created successfully";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.message = action.payload;
      })
      .addCase(getUserPosts.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isPending = false;
        state.isError = false;
        state.posts = action.payload;
      })
      .addCase(getUserPosts.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.message = action.payload;
      })

      .addCase(getAllPosts.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getAllPosts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isPending = false;
        state.isError = false;
        state.posts = action.payload;
      })
      .addCase(getAllPosts.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.message = action.payload;
      })
      .addCase(getPostById.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getPostById.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isPending = false;
        state.posts = action.payload;
      })
      .addCase(getPostById.rejected, (state, action) => {
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
        state.isSuccess = false;
        state.message = action.payload;
      })

      .addCase(deletePost.pending, (state) => {
        state.isPending = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isPending = false;
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload._id
        );
        state.message = "post deleted";
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.message = action.payload;
      })
      .addCase(deleteUserPosts.pending, (state) => {
        state.isPending = true;
      })
      .addCase(deleteUserPosts.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isPending = false;
        state.posts = state.posts.filter((post) => post._id !== action.payload);
        state.message = "post deleted";
      })
      .addCase(deleteUserPosts.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.message = action.payload;
      });
  },
});

export const { resetPost } = postSlice.actions;
export default postSlice.reducer;
