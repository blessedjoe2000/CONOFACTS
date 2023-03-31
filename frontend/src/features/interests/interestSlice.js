import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import interestService from "./interestService";

const initialState = {
  interests: [],
  isPending: false,
  isSuccess: false,
  isError: false,
  message: "",
};

export const createInterest = createAsyncThunk(
  "interests/create",
  async (postData, thunkAPI) => {
    try {
      return await interestService.createInterest(postData);
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

export const getInterest = createAsyncThunk(
  "interests/getAll",
  async (_, thunkAPI) => {
    try {
      return await interestService.getInterest();
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

export const interestSlice = createSlice({
  name: "interest",
  initialState,
  reducers: {
    reset: (state) => {
      state = { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createInterest.pending, (state) => {
        state.isPending = true;
      })
      .addCase(createInterest.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isPending = false;
        state.posts.push(action.payload);
        state.message = "interest created sucessfully";
      })
      .addCase(createInterest.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.message = action.payload;
      })
      .addCase(getInterest.pending, (state) => {
        state.isPending = true;
      })
      .addCase(getInterest.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isPending = false;
        state.isError = false;
        state.posts = action.payload;
      })
      .addCase(getInterest.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.message = action.payload;
      });
  },
});

export const { reset } = interestSlice.actions;
export default interestSlice.reducer;
