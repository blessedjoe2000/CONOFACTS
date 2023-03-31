import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import postReducer from "../features/post/postSlice";
import interestReducer from "../features/interests/interestSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postReducer,
    interests: interestReducer,
  },
});
