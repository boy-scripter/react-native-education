import { baseApi } from '@baseApi';
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = T | undefined;
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
  DateTime: { input: any; output: any; }
  JSONObject: { input: any; output: any; }
};

export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
  user: User;
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ID']['output'];
  color?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCategoryDto = {
  color?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

/** Gender options */
export const GenderEnum = {
  Female: 'FEMALE',
  Male: 'MALE',
  Other: 'OTHER'
} as const;

export type GenderEnum = typeof GenderEnum[keyof typeof GenderEnum];
export type InitiateUploadResponse = {
  __typename?: 'InitiateUploadResponse';
  signedData: Scalars['JSONObject']['output'];
  uploadId: Scalars['String']['output'];
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
  createCategory: Category;
  deleteCategory: Category;
  initiateUpload: InitiateUploadResponse;
  loginWithEmail: AuthResponse;
  loginWithGoogle: AuthResponse;
  profileUpdate: User;
  refreshToken: RefreshTokenResponse;
  sendForgotPasswordCode: SendOtpResponse;
  setNewResetPassword: MessageResponse;
  signup: User;
  updateCategory: Category;
  validateOtp: ValidateOtpResponse;
};


export type MutationCreateCategoryArgs = {
  input: CreateCategoryDto;
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type MutationInitiateUploadArgs = {
  input: UploadDto;
};


export type MutationLoginWithEmailArgs = {
  input: LoginDto;
};


export type MutationLoginWithGoogleArgs = {
  idToken: Scalars['String']['input'];
};


export type MutationProfileUpdateArgs = {
  input: UpdateProfileDto;
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


export type MutationUpdateCategoryArgs = {
  input: UpdateCategoryDto;
};


export type MutationValidateOtpArgs = {
  input: ResetPasswordDto;
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category: Category;
  getHello: Scalars['String']['output'];
  profile: User;
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
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

export type UpdateCategoryDto = {
  _id?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['String']['input']>;
  gender?: InputMaybe<GenderEnum>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UploadDto = {
  contentType: Scalars['String']['input'];
  mediaCode: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type User = {
  __typename?: 'User';
  _id: Scalars['ID']['output'];
  avatar?: Maybe<Scalars['String']['output']>;
  dob?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  gender?: Maybe<GenderEnum>;
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


export type SendForgotPasswordCodeMutation = { __typename?: 'Mutation', sendForgotPasswordCode: { __typename?: 'SendOtpResponse', message: string, retry_after: number } };

export type ValidateOtpMutationVariables = Exact<{
  input: ResetPasswordDto;
}>;


export type ValidateOtpMutation = { __typename?: 'Mutation', validateOtp: { __typename?: 'ValidateOtpResponse', token: string, message: string } };

export type LoginWithGoogleMutationVariables = Exact<{
  idToken: Scalars['String']['input'];
}>;


export type LoginWithGoogleMutation = { __typename?: 'Mutation', loginWithGoogle: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', name: string, email: string, _id: string, avatar?: string | undefined } } };

export type LoginWithEmailMutationVariables = Exact<{
  input: LoginDto;
}>;


export type LoginWithEmailMutation = { __typename?: 'Mutation', loginWithEmail: { __typename?: 'AuthResponse', access_token: string, refresh_token: string, user: { __typename?: 'User', _id: string, name: string, email: string, avatar?: string | undefined } } };

export type ProfileUpdateMutationVariables = Exact<{
  input: UpdateProfileDto;
}>;


export type ProfileUpdateMutation = { __typename?: 'Mutation', profileUpdate: { __typename?: 'User', name: string, gender?: GenderEnum | undefined, email: string, dob?: string | undefined, avatar?: string | undefined, _id: string } };

export type SetNewResetPasswordMutationVariables = Exact<{
  input: SetNewPasswordDto;
}>;


export type SetNewResetPasswordMutation = { __typename?: 'Mutation', setNewResetPassword: { __typename?: 'MessageResponse', message: string } };

export type SignupMutationVariables = Exact<{
  input: SignUpDto;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', name: string, email: string, avatar?: string | undefined, _id: string } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', name: string, email: string, avatar?: string | undefined, _id: string } };

export type InitiateUploadMutationVariables = Exact<{
  input: UploadDto;
}>;


export type InitiateUploadMutation = { __typename?: 'Mutation', initiateUpload: { __typename?: 'InitiateUploadResponse', uploadId: string, signedData: any } };


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
      avatar
    }
  }
}
    `;
export const ProfileUpdateDocument = `
    mutation ProfileUpdate($input: UpdateProfileDto!) {
  profileUpdate(input: $input) {
    name
    gender
    email
    dob
    avatar
    _id
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
    _id
  }
}
    `;
export const ProfileDocument = `
    query Profile {
  profile {
    name
    email
    avatar
    _id
  }
}
    `;
export const InitiateUploadDocument = `
    mutation InitiateUpload($input: UploadDto!) {
  initiateUpload(input: $input) {
    uploadId
    signedData
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
    ProfileUpdate: build.mutation<ProfileUpdateMutation, ProfileUpdateMutationVariables>({
      query: (variables) => ({ document: ProfileUpdateDocument, variables })
    }),
    SetNewResetPassword: build.mutation<SetNewResetPasswordMutation, SetNewResetPasswordMutationVariables>({
      query: (variables) => ({ document: SetNewResetPasswordDocument, variables })
    }),
    Signup: build.mutation<SignupMutation, SignupMutationVariables>({
      query: (variables) => ({ document: SignupDocument, variables })
    }),
    Profile: build.query<ProfileQuery, ProfileQueryVariables | void>({
      query: (variables) => ({ document: ProfileDocument, variables })
    }),
    InitiateUpload: build.mutation<InitiateUploadMutation, InitiateUploadMutationVariables>({
      query: (variables) => ({ document: InitiateUploadDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSendForgotPasswordCodeMutation, useValidateOtpMutation, useLoginWithGoogleMutation, useLoginWithEmailMutation, useProfileUpdateMutation, useSetNewResetPasswordMutation, useSignupMutation, useProfileQuery, useLazyProfileQuery, useInitiateUploadMutation } = injectedRtkApi;

