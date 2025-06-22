import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import {  AuthState, REFRESH_TOKEN } from "@myTypes/auth";
import { api, AuthResponse } from '@/graphql/generated'
import { useStorage } from "@/hooks/useStorage.hook";


const initialState: AuthState = {
  user: null,
  access_token: null,
  refresh_token: null,
  isAuthenticated: false,
};

function setAuthState(state: Draft<AuthState>, payload: AuthResponse) {
  state.user = payload.user;
  state.access_token = payload.access_token;
  state.isAuthenticated = true;

}

const { removeItem } =  useStorage()

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState as AuthState,
  reducers: {
    logout: (state) => {
      removeItem(REFRESH_TOKEN)
      state.access_token = null;
      state.refresh_token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    
    // after login state  
    builder.addMatcher(
      api.endpoints.LoginWithEmail.matchFulfilled,
      (state, { payload }) => {
        const authData = payload.loginWithEmail;
        setAuthState(state, authData);
      }
    );
    builder.addMatcher(
      api.endpoints.LoginWithGoogle.matchFulfilled,
      (state, { payload }) => {
        const authData = payload.loginWithGoogle;
        setAuthState(state, authData);
      }
    );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer