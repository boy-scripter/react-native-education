import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../baseApi/baseApi";

export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer, // Register the base API reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== "production", // Enable Redux DevTools in development
})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
