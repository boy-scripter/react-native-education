import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS_TOKEN_KEY, AuthState } from "@myTypes/auth";
import { useStorage } from "@hooks/useStorage.hook";

const { setItem, removeItem } = useStorage();

const initialState: AuthState = {
    user: null,
    access_token: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState: initialState as AuthState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: AuthState["user"]; access_token: string }>) => {
            const { user, access_token } = action.payload;
            state.user = user;
            state.access_token = access_token;
            state.isAuthenticated = true;

            setItem(ACCESS_TOKEN_KEY, JSON.stringify(access_token));
        },
        logout: (state) => {
            state.access_token = null;
            state.user = null;
            state.isAuthenticated = false;

            removeItem(ACCESS_TOKEN_KEY);
        },
    },
})