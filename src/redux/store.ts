import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/createApi";
import userReducer from "./slices/userSlice";

export const store = configureStore({
  reducer: { [apiSlice.reducerPath]: apiSlice.reducer, user: userReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
