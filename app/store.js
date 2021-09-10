import { configureStore } from "@reduxjs/toolkit";
import userAuth from "../slices/userAuth";

export const store = configureStore({
  reducer: {
    session: userAuth,
  },
});