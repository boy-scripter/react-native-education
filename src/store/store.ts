import { configureStore } from "@reduxjs/toolkit";
import { baseApiSlice } from "../baseApi/baseApi.slice";

export const store = configureStore({
    reducer: {
        [baseApiSlice.reducerPath]: baseApiSlice.reducer, // Register the base API reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
