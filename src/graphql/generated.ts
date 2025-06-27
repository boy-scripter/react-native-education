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

export type MessageResponse = {
  __typename?: 'MessageResponse';
  message: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  loginWithEmail: AuthResponse;
  loginWithGoogle: AuthResponse;
  refreshToken: MessageResponse;
  sendForgotPasswordCode: MessageResponse;
  setNewResetPassword: MessageResponse;
  signup: User;
  validateOtp: ValidateOtpResponse;
};


export type MutationLoginWithEmailArgs = {
  input: LoginDto;
};


export type MutationLoginWithGoogleArgs = {
  idToken: Scalars['String']['input'];
};


export type MutationRefreshTokenArgs = {
  token: Scalars['String']['input'];
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


export type MutationValidateOtpArgs = {
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
  token: Scalars['String']['input'];
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

export type ValidateOtpResponse = {
  __typename?: 'ValidateOtpResponse';
  message: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type SendForgotPasswordCodeMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendForgotPasswordCodeMutation = { __typename?: 'Mutation', sendForgotPasswordCode: { __typename?: 'MessageResponse', message: string } };

export type ValidateOtpMutationVariables = Exact<{
  input: ResetPasswordDto;
}>;


export type ValidateOtpMutation = { __typename?: 'Mutation', validateOtp: { __typename?: 'ValidateOtpResponse', token: string, message: string } };

export type LoginWithEmailMutationVariables = Exact<{
  input: LoginDto;
}>;


export type LoginWithEmailMutation = { __typename?: 'Mutation', loginWithEmail: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', _id: string, name: string, email: string, active: boolean, avatar?: string | null } } };

export type SetNewResetPasswordMutationVariables = Exact<{
  input: SetNewPasswordDto;
}>;


export type SetNewResetPasswordMutation = { __typename?: 'Mutation', setNewResetPassword: { __typename?: 'MessageResponse', message: string } };

export type SignupMutationVariables = Exact<{
  input: SignUpDto;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', name: string, email: string, avatar?: string | null, active: boolean, _id: string } };


export const SendForgotPasswordCodeDocument = `
    mutation SendForgotPasswordCode($email: String!) {
  sendForgotPasswordCode(email: $email) {
    message
  }
}
    `;
export const ValidateOtpDocument = `
    mutation ValidateOtp($input: ResetPasswordDto!) {
  validateOtp(input: $input) {
    token
    message
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
      avatar
    }
  }
}
    `;
export const SetNewResetPasswordDocument = `
    mutation SetNewResetPassword($input: SetNewPasswordDto!) {
  setNewResetPassword(input: $input) {
    message
  }
}
    `;
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

const injectedRtkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    SendForgotPasswordCode: build.mutation<SendForgotPasswordCodeMutation, SendForgotPasswordCodeMutationVariables>({
      query: (variables) => ({ document: SendForgotPasswordCodeDocument, variables })
    }),
    ValidateOtp: build.mutation<ValidateOtpMutation, ValidateOtpMutationVariables>({
      query: (variables) => ({ document: ValidateOtpDocument, variables })
    }),
    LoginWithEmail: build.mutation<LoginWithEmailMutation, LoginWithEmailMutationVariables>({
      query: (variables) => ({ document: LoginWithEmailDocument, variables })
    }),
    SetNewResetPassword: build.mutation<SetNewResetPasswordMutation, SetNewResetPasswordMutationVariables>({
      query: (variables) => ({ document: SetNewResetPasswordDocument, variables })
    }),
    Signup: build.mutation<SignupMutation, SignupMutationVariables>({
      query: (variables) => ({ document: SignupDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSendForgotPasswordCodeMutation, useValidateOtpMutation, useLoginWithEmailMutation, useSetNewResetPasswordMutation, useSignupMutation } = injectedRtkApi;

