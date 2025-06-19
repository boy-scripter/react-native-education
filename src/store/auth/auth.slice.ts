import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN_KEY, AuthState } from "@myTypes/auth";
import { useStorage } from "@hooks/useStorage.hook";
import { api, AuthResponse } from 'src/graphql/generated'

const { setItem, removeItem } = useStorage();

const initialState: AuthState = {
  user: null,
  access_token: null,
  isAuthenticated: false,
};

function setAuthState(state: Draft<AuthState>, payload: AuthResponse) {
  state.user = payload.user;
  state.access_token = payload.access_token;
  state.isAuthenticated = true;
  setItem(ACCESS_TOKEN_KEY, JSON.stringify(payload.access_token));
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState as AuthState,
  reducers: {
    logout: (state) => {
      state.access_token = null;
      state.user = null;
      state.isAuthenticated = false;
      removeItem(ACCESS_TOKEN_KEY);
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
