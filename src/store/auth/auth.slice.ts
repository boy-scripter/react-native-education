import {createSlice, isAnyOf, PayloadAction} from '@reduxjs/toolkit';
import {ACCESS_TOKEN_KEY, AuthState} from '@myTypes/auth';
import {useStorage} from '@hooks/useStorage.hook';
import {api } from 'src/graphql/generated';

const {setItem, removeItem} = useStorage();

const initialState: AuthState = {
  user: null,
  access_token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState as AuthState,
  reducers: {
    logout: state => {
      state.access_token = null;
      state.user = null;
      state.isAuthenticated = false;

      removeItem(ACCESS_TOKEN_KEY);
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
        isAnyOf(
          api.endpoints.loginWithEmail.matchFulfilled,
          api.endpoints.LoginWithGoogle.matchFulfilled // ✅ fix casing
        ),
        (state, action) => {
          const { user, access_token } = action.payload;
          state.user = user;
          state.access_token = access_token;
          state.isAuthenticated = true;
          setItem(ACCESS_TOKEN_KEY, JSON.stringify(access_token));
        }
      );
      
  },
});
