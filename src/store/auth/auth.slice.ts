import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, REMEMBER_ME } from "@myTypes/auth";
import { api, AuthResponse } from '@/graphql/generated'
import { useStorage } from "@/hooks/useStorage.hook";
import { navigate } from "@/hooks/useNavigation.hook";
import { setDataLocally } from "./auth.service";

const { removeItem, getItem } = useStorage()

const authState = getItem<AuthState>(REMEMBER_ME)
const initialState = {
  user: authState?.user || null,
  access_token: authState?.access_token || null,
  refresh_token: authState?.refresh_token || null,
  isAuthenticated: authState?.isAuthenticated || false,
  remember_me: true
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {

    logout: (state) => {

      state.access_token = null;
      state.refresh_token = null;
      state.user = null;
      state.isAuthenticated = false;
      state.remember_me = false;

      navigate('AuthStack')
      removeItem(REMEMBER_ME);
    },

    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.access_token = action.payload;
      setDataLocally({ ...state })
    },

    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.remember_me = action.payload;
      setDataLocally({ ...state })
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
      api.endpoints.Profile.matchFulfilled,
      (state, { payload }) => {
        state.user = {
          ...payload.profile,
          avatar: payload.profile.avatar || undefined,
        };
        setDataLocally({ ...state })
      }
    );

  },
});


function applyAuthState(state: Draft<AuthState>, payload: AuthResponse) {
  state.user = {
    ...payload.user,
    avatar: payload.user.avatar || undefined,
    dob: undefined,
    gender: undefined,
  };
  state.access_token = payload.access_token;
  state.refresh_token = payload.refresh_token;
  state.isAuthenticated = true;
  setDataLocally({ ...state })
}

export const { logout, setRememberMe, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
