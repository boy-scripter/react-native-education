import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../baseApi/baseApi";
import { useDispatch , TypedUseSelectorHook , useSelector ,Provider} from "react-redux";

import AuthReducer from './auth/auth.slice'
import { ReactNode } from "react";


export const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer, // Register the base API reducer
         auth : AuthReducer 
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
    devTools: true, 

})
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const ReduxStore = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};

export const useAppDispatch = () => useDispatch<AppDispatch>() 
export const useRootState : TypedUseSelectorHook<RootState> = useSelector