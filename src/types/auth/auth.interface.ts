import {AuthActionType} from './auth.enum';

export type AuthAction =
  | {type: AuthActionType.LOGIN_SUCCESS; payload: {user: User; access_token: string}}
  | {type: AuthActionType.SIGNUP_SUCCESS}
  | {type: AuthActionType.LOGOUT}
  | {type: AuthActionType.SET_LOADING; payload: boolean}
  | {type: AuthActionType.SET_ERROR; payload: Error | null};

export interface User {
  id: string;
  email: string;
}

export interface AuthenticatedUser {
  user: User;
  isAuthenticated: true;
  access_token: string;
}

export interface UnauthenticatedUser {
  user: null;
  access_token: null;
  isAuthenticated: false;
}

export type AuthState =  (AuthenticatedUser | UnauthenticatedUser); 

export interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => void;
}
