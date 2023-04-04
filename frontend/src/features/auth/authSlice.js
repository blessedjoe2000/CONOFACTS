import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { updateUser } from "./authService";

const API_URL = `conofacts/users`;

//Get user from local storage
const user = localStorage.getItem("user");
const token = localStorage.getItem("token");

const initialState = {
  user: user ? JSON.parse(user) : null,
  token: token ? JSON.parse(token) : null,
  isPending: false,
  isSuccess: false,
  isError: false,
  message: "",
};

//Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (err) {
    const message =
      (err.response && err.response.data && err.response.data.message) ||
      err.message ||
      err.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const update = createAsyncThunk(
  "auth/update",
  async (updatedUser, thunkAPI) => {
    try {
      const response = await axios.put(
        `${API_URL}/${updatedUser.id}`,
        updatedUser
      );
      localStorage.setItem("user", JSON.stringify(response.data));
      thunkAPI.dispatch(updateUser(response.data));
      return response.data;
    } catch (err) {
      const message =
        (err.response && err.response.data && err.response.data.message) ||
        err.message ||
        err.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isPending = false;
    //   state.isSuccess = false;
    //   state.isError = false;
    //   state.message = "";
    // },
    reset: (state) => {
      state = { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isPending = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isPending = false;
        state.user = action.payload;
        state.message = "user created sucessfully";
      })
      .addCase(register.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(login.pending, (state) => {
        state.isPending = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isPending = false;
        state.user = action.payload;
        state.message = "user logged in sucessfully";
      })
      .addCase(login.rejected, (state, action) => {
        state.isError = true;
        state.isPending = false;
        state.isSuccess = false;
        state.message = action.payload;
        state.user = null;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
      })

      .addCase(update.pending, (state) => {
        state.isPending = true;
      })
      .addCase(update.fulfilled, (state, action) => {
        state.isPending = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.message = "user updated successfully";
        localStorage.setItem("user", JSON.stringify(state.user));
      })
      .addCase(update.rejected, (state, action) => {
        state.isPending = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
