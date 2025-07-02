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
  remember_me: true
};

const { removeItem, setItem } = useStorage()

function applyAuthState(state: Draft<AuthState>, payload: AuthResponse) {
  state.user = {
    ...payload.user,
    avatar: payload.user.avatar || fallbackAvatar,
  };
  state.access_token = payload.access_token;
  state.refresh_token = payload.refresh_token;
  state.isAuthenticated = true;

  if (state.remember_me) {
    setItem(REMEMBER_ME, state);
  }

}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {

    logout: (state) => {
      removeItem(REMEMBER_ME);
      state.access_token = null;
      state.refresh_token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.remember_me = false;
    },

    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.remember_me = action.payload;
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

    builder.addMatcher(
      api.endpoints.RefreshToken.matchFulfilled,
      (state, { payload }) => {
        state.access_token = payload.refreshToken.access_token;
        if (state.remember_me) {
          setItem(REMEMBER_ME, state);
        }
      }
    );

    builder.addMatcher(
      api.endpoints.User.matchFulfilled,
      (state, { payload }) => {

        const user = payload.me.user;
        state.user = {
          _id: user._id,
          name: user.name,
          email: user.email,
          active: user.active,
          avatar: user.avatar || fallbackAvatar,
        };

        if (state.remember_me) {
          setItem<Auth(REMEMBER_ME, state);
        }

      }
    );

  },
});

export const { logout, setAuthState, setRememberMe } = authSlice.actions;
export default authSlice.reducer;
