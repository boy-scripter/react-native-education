import { SignUpSchema } from "@/components/Signup";
import { LoginSchema } from "@/components/Login";
import { z } from "zod";
import { RouteProp } from "@react-navigation/native";

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
export type signUpType = z.infer<typeof SignUpSchema>;
export type loginType = z.infer<typeof LoginSchema>;


// authscreen parameter list
export enum Modes {
  LOGIN = 'login',
  SIGNUP = 'signup',
}
export type Mode = `${Modes}`; 
export type AuthStackParamList = {
  Auth: { mode?: Mode };
};
export type AuthRouteProp = RouteProp<AuthStackParamList, 'Auth'>;