import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import ownerReducer from "./ownerSlice.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    owner: ownerReducer,
  },
});

export default store;

