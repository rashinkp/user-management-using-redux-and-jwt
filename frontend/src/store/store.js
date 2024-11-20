// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js";
import authAdminReducer from "../slices/authAdmin.js";
import { apiSlice } from "../slices/apiSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: authAdminReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
