import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js";
import { apiSlice } from "../slices/apiSlice.js";
import { usersApiSlice } from "../slices/usersApiSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [usersApiSlice.reducerPath]: usersApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware ),
  devTools: true,
});

export default store;
