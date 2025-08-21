import { GenderEnum } from "@/graphql/generated";

export type { AuthResponse } from '@/graphql/generated';

export interface User {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  gender?: GenderEnum;
  dob?: string;
}

export interface AuthenticatedUser {
  user: User;
  access_token: string;
  refresh_token: string;
  isAuthenticated: true;
}

export interface UnauthenticatedUser {
  user: null;
  access_token: null;
  refresh_token: null;
  isAuthenticated: false;
}

// Make AuthState always have remember_me
export type AuthState = (AuthenticatedUser | UnauthenticatedUser) & {
  remember_me: boolean;
};
