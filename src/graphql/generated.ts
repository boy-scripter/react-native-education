import { baseApi } from '@baseApi';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
  user: User;
};

export type LoginDto = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  loginWithEmail: AuthResponse;
  loginWithGoogle: AuthResponse;
  sendForgotPasswordCode: Scalars['String']['output'];
  setNewResetPassword: Scalars['String']['output'];
  signup: User;
  validateResetOtp: Scalars['String']['output'];
};


export type MutationLoginWithEmailArgs = {
  input: LoginDto;
};


export type MutationLoginWithGoogleArgs = {
  code: Scalars['String']['input'];
  scope: Array<Scalars['String']['input']>;
};


export type MutationSendForgotPasswordCodeArgs = {
  email: Scalars['String']['input'];
};


export type MutationSetNewResetPasswordArgs = {
  input: SetNewPasswordDto;
};


export type MutationSignupArgs = {
  input: SignUpDto;
};


export type MutationValidateResetOtpArgs = {
  input: ResetPasswordDto;
};

export type Query = {
  __typename?: 'Query';
  getHello: Scalars['String']['output'];
};

export type ResetPasswordDto = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};

export type SetNewPasswordDto = {
  password: Scalars['String']['input'];
};

export type SignUpDto = {
  email: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  active: Scalars['Boolean']['output'];
  avatar?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type SignupMutationVariables = Exact<{
  input: SignUpDto;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', name: string, email: string, avatar?: string | null, active: boolean, _id: string } };

export type LoginWithGoogleMutationVariables = Exact<{
  code: Scalars['String']['input'];
  scope: Array<Scalars['String']['input']> | Scalars['String']['input'];
}>;


export type LoginWithGoogleMutation = { __typename?: 'Mutation', loginWithGoogle: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', name: string, email: string, _id: string, active: boolean } } };

export type LoginWithEmailMutationVariables = Exact<{
  input: LoginDto;
}>;


export type LoginWithEmailMutation = { __typename?: 'Mutation', loginWithEmail: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', _id: string, name: string, email: string, active: boolean } } };


export const SignupDocument = `
    mutation Signup($input: SignUpDto!) {
  signup(input: $input) {
    name
    email
    avatar
    active
    _id
  }
}
    `;
export const LoginWithGoogleDocument = `
    mutation LoginWithGoogle($code: String!, $scope: [String!]!) {
  loginWithGoogle(code: $code, scope: $scope) {
    access_token
    refresh_token
    user {
      name
      email
      _id
      active
    }
  }
}
    `;
export const LoginWithEmailDocument = `
    mutation LoginWithEmail($input: LoginDto!) {
  loginWithEmail(input: $input) {
    access_token
    refresh_token
    user {
      _id
      name
      email
      active
    }
  }
}
    `;

const injectedRtkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    Signup: build.mutation<SignupMutation, SignupMutationVariables>({
      query: (variables) => ({ document: SignupDocument, variables })
    }),
    LoginWithGoogle: build.mutation<LoginWithGoogleMutation, LoginWithGoogleMutationVariables>({
      query: (variables) => ({ document: LoginWithGoogleDocument, variables })
    }),
    LoginWithEmail: build.mutation<LoginWithEmailMutation, LoginWithEmailMutationVariables>({
      query: (variables) => ({ document: LoginWithEmailDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSignupMutation, useLoginWithGoogleMutation, useLoginWithEmailMutation } = injectedRtkApi;

