import { NavigatorScreenParams } from '@react-navigation/native';


export type AuthStackParamList = {
  LoginAndSignUp: { mode: 'login' | 'signup' } | undefined;
  ForgotPassword: undefined;
};

export type AuthStackNavigation = NavigatorScreenParams<AuthStackParamList>;
