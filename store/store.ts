import { configureStore } from "@reduxjs/toolkit";
import newsletterReducer from "./newsletterSlice";

export const store = configureStore({
  reducer: {
    newsletter: newsletterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
