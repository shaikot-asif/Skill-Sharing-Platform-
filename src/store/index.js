import { configureStore } from "@reduxjs/toolkit";

import { userReducer } from "./reducers/userReducer.js";

const userInfoFormStorage = localStorage.getItem("account")
  ? JSON.parse(localStorage.getItem("account"))
  : null;

const initialState = {
  user: { userInfo: userInfoFormStorage },
};
const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: initialState,
});

export default store;
