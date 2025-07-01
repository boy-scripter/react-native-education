import { NavigatorScreenParams } from '@react-navigation/native';


export type AuthStackParamList = {
  LoginAndSignup?: { mode: 'login' | 'signup'  };
  ForgotPassword?: { step: number  };
};

export type AuthStackNavigation = NavigatorScreenParams<AuthStackParamList>;
