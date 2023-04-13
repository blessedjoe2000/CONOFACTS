import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postService from "./postService";

const initialState = {
  posts: [],
  isPending: false,
<<<<<<< HEAD
  isError: false,
  isSuccess: false,
=======
  isSuccess: false,
  isError: false,
>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6
  message: "",
};

export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
<<<<<<< HEAD
      const response = await postService.createPost(postData, token);
      return response.data;
=======
      return await postService.createPost(postData, token);
>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6
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
<<<<<<< HEAD
  "posts/getAll",
=======
  "posts/getUserPost",
>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6
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

<<<<<<< HEAD
=======
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
      return thunkAPI.rejectWithVaue(message);
    }
  }
);

>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6
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
<<<<<<< HEAD
    reset: (state) => initialState,
=======
    reset: (state) => {
      state = { ...initialState };
    },
>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6
  },
  extraReducers: (builder) => {
    builder
      .addCase(createPost.pending, (state) => {
        state.isPending = true;
      })
      .addCase(createPost.fulfilled, (state, action) => {
<<<<<<< HEAD
        state.isPending = false;
        state.isSuccess = true;
        state.posts.push(action.payload);
        state.message = "user created sucessfully";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isPending = false;
        state.isError = true;
=======
        state.isSuccess = true;
        state.isPending = false;
        state.posts.push(action.payload);
        state.message = "post created sucessfully";
      })
      .addCase(createPost.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6
        state.message = action.payload;
      })
      .addCase(getPosts.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
<<<<<<< HEAD
        state.isPending = false;
        state.isSuccess = true;
=======
        state.isSuccess = true;
        state.isPending = false;
>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6
        state.isError = false;
        state.posts = action.payload;
      })
      .addCase(getPosts.rejected, (state, action) => {
<<<<<<< HEAD
        state.isPending = false;
        state.isError = true;
=======
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
>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6
        state.message = action.payload;
      })
      .addCase(updatePost.pending, (state) => {
        state.isPending = true;
      })
      .addCase(updatePost.fulfilled, (state, action) => {
<<<<<<< HEAD
        state.isPending = false;
        state.isSuccess = true;
        state.posts = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isPending = false;
        state.isError = true;
=======
        state.isSuccess = true;
        state.isPending = false;
        state.posts = action.payload;
      })
      .addCase(updatePost.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6
        state.message = action.payload;
      })

      .addCase(deletePost.pending, (state) => {
        state.isPending = true;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
<<<<<<< HEAD
        state.isPending = false;
        state.isSuccess = true;
=======
        state.isSuccess = true;
        state.isPending = false;
>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.id
        );
      })
      .addCase(deletePost.rejected, (state, action) => {
<<<<<<< HEAD
        state.isPending = false;
        state.isError = true;
=======
        state.isError = true;
        state.isPending = false;
>>>>>>> b04a3eff6aff7e6b055680047172c855e5de89e6
        state.message = action.payload;
      });
  },
});

export const { reset } = postSlice.actions;
export default postSlice.reducer;
