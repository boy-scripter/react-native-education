import {createContext, useContext, useReducer} from 'react';
import authReducer from './Auth.reducer';
import {AuthContextType, AuthState} from 'src/types/auth/auth.interface';

const initialState: AuthState = {
  loading: false,
  error: null,
  user: null,
  access_token: null,
};

const AuthContext = createContext<null | AuthContextType>(null);
const [state, dispatch] = useReducer(authReducer, initialState);

const login = async (email: string) => {
  // Simulate API call
  console.log('Logging in:', email);
  setUser({id: '123', email});
};

const signup = async (email: string) => {
  console.log('Signing up:', email);
  setUser({id: '456', email});
};

const signup = async (email: string, password: string) => {
  console.log('Signing up:', email);
  setUser({id: '456', email});
};

const forgotPassword = async (email: string) => {
  console.log('Sending password reset email to:', email);
  // Simulate sending email
};

const logout = () => {
  console.log('Logging out...');
  setUser(null);
};

export function AuthProvider() {
  return <AuthContext.Provider value={{login, logout, signup, forgotPassword, authState: state}}></AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('AuthContext is not available. Make sure you are using the AuthProvider.');
  return ctx;
}
