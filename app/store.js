import { configureStore } from "@reduxjs/toolkit";
import userAuth from "../slices/userAuth";
import userBalance from "../slices/userBalance";

export const store = configureStore({
  reducer: {
    session: userAuth,
    balance: userBalance
  },
});