import { SignUpSchema } from "@/components/Signup";
import { LoginSchema } from "@/components/Login";
import { z } from "zod";


export interface User {
  _id: string;
  email: string;
  active: boolean
  name: string
  avatar?: string
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

export type AuthState = (AuthenticatedUser | UnauthenticatedUser);
