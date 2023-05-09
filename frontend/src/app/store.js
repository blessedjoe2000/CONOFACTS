import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/post/postSlice";
import postUserReducer from "../features/postUser/postUserSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    postUser: postUserReducer,
  },
});
