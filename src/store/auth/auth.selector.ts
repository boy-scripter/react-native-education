import { AuthState } from "@myTypes/auth";

export const selectAuth = (state: { auth: AuthState }) => state.auth;
export const selectRememberMe = (state: { auth: AuthState }) => state.auth.remember_me;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;