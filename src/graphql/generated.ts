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
  refreshToken: RefreshTokenResponse;
  sendForgotPasswordCode: SendOtpResponse;
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
  me: UserResponse;
};

export type RefreshTokenResponse = {
  __typename?: 'RefreshTokenResponse';
  access_token: Scalars['String']['output'];
  message: Scalars['String']['output'];
};

export type ResetPasswordDto = {
  email: Scalars['String']['input'];
  otp: Scalars['String']['input'];
};

export type SendOtpResponse = {
  __typename?: 'SendOtpResponse';
  message: Scalars['String']['output'];
  retry_after: Scalars['Float']['output'];
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

export type UserResponse = {
  __typename?: 'UserResponse';
  user: User;
};

export type ValidateOtpResponse = {
  __typename?: 'ValidateOtpResponse';
  message: Scalars['String']['output'];
  token: Scalars['String']['output'];
};

export type SendForgotPasswordCodeMutationVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type SendForgotPasswordCodeMutation = { __typename?: 'Mutation', sendForgotPasswordCode: { __typename?: 'SendOtpResponse', message: string, retry_after: number } };

export type ValidateOtpMutationVariables = Exact<{
  input: ResetPasswordDto;
}>;


export type ValidateOtpMutation = { __typename?: 'Mutation', validateOtp: { __typename?: 'ValidateOtpResponse', token: string, message: string } };

export type LoginWithGoogleMutationVariables = Exact<{
  idToken: Scalars['String']['input'];
}>;


export type LoginWithGoogleMutation = { __typename?: 'Mutation', loginWithGoogle: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', name: string, email: string, _id: string, active: boolean, avatar?: string | null } } };

export type LoginWithEmailMutationVariables = Exact<{
  input: LoginDto;
}>;


export type LoginWithEmailMutation = { __typename?: 'Mutation', loginWithEmail: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', _id: string, name: string, email: string, active: boolean, avatar?: string | null } } };

export type RefreshTokenMutationVariables = Exact<{
  token: Scalars['String']['input'];
}>;


export type RefreshTokenMutation = { __typename?: 'Mutation', refreshToken: { __typename?: 'RefreshTokenResponse', message: string, access_token: string } };

export type SetNewResetPasswordMutationVariables = Exact<{
  input: SetNewPasswordDto;
}>;


export type SetNewResetPasswordMutation = { __typename?: 'Mutation', setNewResetPassword: { __typename?: 'MessageResponse', message: string } };

export type SignupMutationVariables = Exact<{
  input: SignUpDto;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', name: string, email: string, avatar?: string | null, active: boolean, _id: string } };

export type UserQueryVariables = Exact<{ [key: string]: never; }>;


export type UserQuery = { __typename?: 'Query', me: { __typename?: 'UserResponse', user: { __typename?: 'User', name: string, email: string, avatar?: string | null, active: boolean, _id: string } } };


export const SendForgotPasswordCodeDocument = `
    mutation SendForgotPasswordCode($email: String!) {
  sendForgotPasswordCode(email: $email) {
    message
    retry_after
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
export const LoginWithGoogleDocument = `
    mutation LoginWithGoogle($idToken: String!) {
  loginWithGoogle(idToken: $idToken) {
    access_token
    refresh_token
    user {
      name
      email
      _id
      active
      avatar
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
      avatar
    }
  }
}
    `;
export const RefreshTokenDocument = `
    mutation RefreshToken($token: String!) {
  refreshToken(token: $token) {
    message
    access_token
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
export const UserDocument = `
    query User {
  me {
    user {
      name
      email
      avatar
      active
      _id
    }
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
    LoginWithGoogle: build.mutation<LoginWithGoogleMutation, LoginWithGoogleMutationVariables>({
      query: (variables) => ({ document: LoginWithGoogleDocument, variables })
    }),
    LoginWithEmail: build.mutation<LoginWithEmailMutation, LoginWithEmailMutationVariables>({
      query: (variables) => ({ document: LoginWithEmailDocument, variables })
    }),
    RefreshToken: build.mutation<RefreshTokenMutation, RefreshTokenMutationVariables>({
      query: (variables) => ({ document: RefreshTokenDocument, variables })
    }),
    SetNewResetPassword: build.mutation<SetNewResetPasswordMutation, SetNewResetPasswordMutationVariables>({
      query: (variables) => ({ document: SetNewResetPasswordDocument, variables })
    }),
    Signup: build.mutation<SignupMutation, SignupMutationVariables>({
      query: (variables) => ({ document: SignupDocument, variables })
    }),
    User: build.query<UserQuery, UserQueryVariables | void>({
      query: (variables) => ({ document: UserDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSendForgotPasswordCodeMutation, useValidateOtpMutation, useLoginWithGoogleMutation, useLoginWithEmailMutation, useRefreshTokenMutation, useSetNewResetPasswordMutation, useSignupMutation, useUserQuery, useLazyUserQuery } = injectedRtkApi;

