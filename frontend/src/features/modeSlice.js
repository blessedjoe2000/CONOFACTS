import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleMode } = appSlice.actions;

export default appSlice.reducer;
