import { GenderEnum } from "@/graphql/generated";

export interface User {
  _id: string;
  email: string;
  name: string
  avatar?: string
  gender?:  GenderEnum
  dob?: string
}

export interface AuthenticatedUser {
  user: User;
  refresh_token: string;
  isAuthenticated: true;
  access_token: string;
}

export interface UnauthenticatedUser {
  user: null;
  refresh_token: null;
  access_token: null;
  isAuthenticated: false;
}

export type AuthState = (AuthenticatedUser | UnauthenticatedUser) & {
  remember_me: boolean
};
