import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, REMEMBER_ME } from "@myTypes/auth";
import { api, AuthResponse } from '@/graphql/generated'
import { useStorage } from "@/hooks/useStorage.hook";
import fallbackAvatar from '@assets/images/profile.png'

const initialState: AuthState = {
  user: null,
  access_token: null,
  refresh_token: null,
  isAuthenticated: false,
};

const { removeItem } = useStorage()

function applyAuthState(state: Draft<AuthState>, payload: AuthResponse) {
  state.user = {
    ...payload.user,
    avatar: payload.user.avatar || fallbackAvatar,
  };
  state.access_token = payload.access_token;
  state.refresh_token = payload.refresh_token;
  state.isAuthenticated = true;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      removeItem(REMEMBER_ME);
      state.access_token = null;
      state.refresh_token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
    setAuthState(state, action: PayloadAction<AuthResponse>) {
      applyAuthState(state, action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.LoginWithEmail.matchFulfilled,
      (state, { payload }) => {
        applyAuthState(state, payload.loginWithEmail);
      }
    );

    builder.addMatcher(
      api.endpoints.LoginWithGoogle.matchFulfilled,
      (state, { payload }) => {
        applyAuthState(state, payload.loginWithGoogle);
      }
    );
  },
});

export const { logout, setAuthState } = authSlice.actions;
export default authSlice.reducer;
