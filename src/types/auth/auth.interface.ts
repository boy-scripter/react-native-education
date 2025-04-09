import {AuthActionType} from './auth.enum';

export type AuthAction =
  | {type: AuthActionType.LOGIN_SUCCESS; payload: User}
  | {type: AuthActionType.SIGNUP_SUCCESS; payload: User}
  | {type: AuthActionType.LOGOUT}
  | {type: AuthActionType.SET_LOADING; payload: boolean}
  | {type: AuthActionType.SET_ERROR; payload: string | null};

export interface User {
  id: string;
  email: string;
}

export interface AuthenticatedUser {
  user: User;
  access_token: string;
}

export interface UnauthenticatedUser {
  user: null;
  access_token: null;
}

type AuthUser = AuthenticatedUser | UnauthenticatedUser;

export type AuthState = AuthUser & {
  loading: boolean;
  error: Error | null;
};

export interface AuthContextType {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  logout: () => void;
}

