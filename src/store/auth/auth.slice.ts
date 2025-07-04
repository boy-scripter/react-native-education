import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, REMEMBER_ME } from "@myTypes/auth";
import { api, AuthResponse } from '@/graphql/generated'
import { useStorage } from "@/hooks/useStorage.hook";
import { AuthenticatedUser } from '@myTypes/auth'
import { navigate } from "@/hooks/useNavigation.hook";
import fallbackAvatar from '@assets/images/profile.png'

const { removeItem, setItem, getItem } = useStorage()

const authState = getItem<AuthState>(REMEMBER_ME)
const initialState = {
  user: authState?.user || null,
  access_token: authState?.access_token || null,
  refresh_token: authState?.refresh_token || null,
  isAuthenticated: authState?.isAuthenticated || false,
  remember_me: true
};


function applyAuthState(state: Draft<AuthState>, payload: AuthResponse) {
  state.user = {
    ...payload.user,
    avatar: payload.user.avatar || fallbackAvatar,
  };
  state.access_token = payload.access_token;
  state.refresh_token = payload.refresh_token;
  state.isAuthenticated = true;

  if (state.remember_me) setItem(REMEMBER_ME, state);

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
      navigate('AuthStack')
    },

    setAccessToken: (state, action: PayloadAction<string | null>) => {
      state.access_token = action.payload;

      if (state.remember_me) {
        const oldData = getItem<AuthenticatedUser>(REMEMBER_ME)
        setItem(REMEMBER_ME, { ...oldData, access_token: action.payload });
      }
    },

    setRememberMe: (state, action: PayloadAction<boolean>) => {
      state.remember_me = action.payload;
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
      api.endpoints.User.matchFulfilled,
      (state, { payload }) => {

        const user = payload.me;
        state.user = {
          _id: user._id,
          name: user.name,
          email: user.email,
          active: user.active,
          avatar: user.avatar || fallbackAvatar,
        };
        
        if (state.remember_me) {
          const oldData = getItem<AuthenticatedUser>(REMEMBER_ME);
          setItem(REMEMBER_ME, { ...oldData, user: state.user });
        }

      }
    );

  },
});

export const { logout, setRememberMe, setAccessToken } = authSlice.actions;
export default authSlice.reducer;
