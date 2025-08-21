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
  Number: { input: any; output: any; }
};

export type Answer = {
  __typename?: 'Answer';
  questionId: Scalars['ID']['output'];
  selectedOption?: Maybe<AnswerType>;
  status: AnswerStatus;
  timeAvailable: Scalars['Number']['output'];
  timeTaken: Scalars['Number']['output'];
};

export const AnswerStatus = {
  Correct: 'CORRECT',
  Incorrect: 'INCORRECT',
  Timeout: 'TIMEOUT'
} as const;

export type AnswerStatus = typeof AnswerStatus[keyof typeof AnswerStatus];
export const AnswerType = {
  Option_0: 'OPTION_0',
  Option_1: 'OPTION_1',
  Option_2: 'OPTION_2',
  Option_3: 'OPTION_3'
} as const;

export type AnswerType = typeof AnswerType[keyof typeof AnswerType];
export type AuthResponse = {
  __typename?: 'AuthResponse';
  access_token: Scalars['String']['output'];
  refresh_token: Scalars['String']['output'];
  user: User;
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['ID']['output'];
  color: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  questionCount: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCategoryDto = {
  color?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};

export type DateRangeInput = {
  gt: Scalars['DateTime']['input'];
  gte?: InputMaybe<Scalars['DateTime']['input']>;
  lt?: InputMaybe<Scalars['DateTime']['input']>;
  lte?: InputMaybe<Scalars['DateTime']['input']>;
};

/** Union type for different game history modes */
export type GameHistory = SinglePlayerGame;

export type GameHistoryBase = {
  _id: Scalars['ID']['output'];
  categoryId: Category;
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  players: Array<Player>;
  questions: Array<Question>;
  startedAt: Scalars['DateTime']['output'];
};

export const GameModeType = {
  Onevone: 'ONEVONE',
  Single: 'SINGLE'
} as const;

export type GameModeType = typeof GameModeType[keyof typeof GameModeType];
export const GameResult = {
  Draw: 'DRAW',
  Loss: 'LOSS',
  Win: 'WIN'
} as const;

export type GameResult = typeof GameResult[keyof typeof GameResult];
/** Gender options */
export const GenderEnum = {
  Female: 'FEMALE',
  Male: 'MALE',
  Other: 'OTHER'
} as const;

export type GenderEnum = typeof GenderEnum[keyof typeof GenderEnum];
export type GlobalLeaderboardFilterDto = {
  createdAt: DateRangeInput;
};

export type InitiateUploadResponse = {
  __typename?: 'InitiateUploadResponse';
  signedData: Scalars['JSONObject']['output'];
  uploadId: Scalars['String']['output'];
};

export type Leaderboard = {
  __typename?: 'Leaderboard';
  rank: Scalars['Int']['output'];
  totalPoints: Scalars['Int']['output'];
  userId: UserSummary;
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

export type PaginatedGameHistoryResponse = {
  __typename?: 'PaginatedGameHistoryResponse';
  docs: Array<GameHistory>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedPdfResponse = {
  __typename?: 'PaginatedPdfResponse';
  docs: Array<Pdf>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type PaginatedQuestionResponse = {
  __typename?: 'PaginatedQuestionResponse';
  docs: Array<Question>;
  hasNextPage: Scalars['Boolean']['output'];
  hasPrevPage: Scalars['Boolean']['output'];
  limit: Scalars['Int']['output'];
  nextPage?: Maybe<Scalars['Int']['output']>;
  page: Scalars['Int']['output'];
  prevPage?: Maybe<Scalars['Int']['output']>;
  totalDocs: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type Pdf = {
  __typename?: 'Pdf';
  _id: Scalars['ID']['output'];
  category: Category;
  createdAt: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type PdfFilterDto = {
  category?: InputMaybe<Scalars['ID']['input']>;
};

export type PersonalLeaderBoard = {
  __typename?: 'PersonalLeaderBoard';
  rank: Scalars['Int']['output'];
  totalPoints: Scalars['Int']['output'];
};

export type Player = {
  __typename?: 'Player';
  _id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category: Category;
  findById: Pdf;
  gameHistories: PaginatedGameHistoryResponse;
  gameHistoryById: GameHistory;
  getHello: Scalars['String']['output'];
  globalLeaderboard: Array<Leaderboard>;
  pdfs: PaginatedPdfResponse;
  personalLeaderboard?: Maybe<PersonalLeaderBoard>;
  profile: User;
  questions: PaginatedQuestionResponse;
  refreshLeaderBoard: RefreshResponse;
};


export type QueryCategoryArgs = {
  id: Scalars['ID']['input'];
};


export type QueryFindByIdArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGameHistoriesArgs = {
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};


export type QueryGameHistoryByIdArgs = {
  gameId: Scalars['String']['input'];
};


export type QueryGlobalLeaderboardArgs = {
  input: GlobalLeaderboardFilterDto;
};


export type QueryPdfsArgs = {
  filter?: PdfFilterDto;
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};


export type QueryQuestionsArgs = {
  filter?: QuestionFilterDto;
  limit?: Scalars['Int']['input'];
  page?: Scalars['Int']['input'];
};

export type Question = {
  __typename?: 'Question';
  _id: Scalars['ID']['output'];
  category: Category;
  options: Array<Scalars['String']['output']>;
  questionText: Scalars['String']['output'];
  time: Scalars['Int']['output'];
};

export type QuestionFilterDto = {
  category?: InputMaybe<Scalars['ID']['input']>;
};

export type RefreshResponse = {
  __typename?: 'RefreshResponse';
  lastRefreshAt: Scalars['String']['output'];
  nextRefreshAt: Scalars['String']['output'];
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

export type SinglePlayerGame = GameHistoryBase & {
  __typename?: 'SinglePlayerGame';
  _id: Scalars['ID']['output'];
  answers: Array<Answer>;
  categoryId: Category;
  endedAt?: Maybe<Scalars['DateTime']['output']>;
  mode: GameModeType;
  players: Array<Player>;
  questions: Array<Question>;
  score: Scalars['Number']['output'];
  startedAt: Scalars['DateTime']['output'];
  status: GameResult;
  totalCorrect: Scalars['Number']['output'];
  totalTimeAvailable: Scalars['Number']['output'];
  totalTimeTaken: Scalars['Number']['output'];
};

export type UpdateCategoryDto = {
  _id?: InputMaybe<Scalars['String']['input']>;
  color?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProfileDto = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  dob?: InputMaybe<Scalars['DateTime']['input']>;
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
  dob?: Maybe<Scalars['DateTime']['output']>;
  email: Scalars['String']['output'];
  gender?: Maybe<GenderEnum>;
  name: Scalars['String']['output'];
};

export type UserSummary = {
  __typename?: 'UserSummary';
  _id: Scalars['ID']['output'];
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


export type ProfileUpdateMutation = { __typename?: 'Mutation', profileUpdate: { __typename?: 'User', name: string, gender?: GenderEnum | undefined, email: string, dob?: any | undefined, avatar?: string | undefined, _id: string } };

export type SetNewResetPasswordMutationVariables = Exact<{
  input: SetNewPasswordDto;
}>;


export type SetNewResetPasswordMutation = { __typename?: 'Mutation', setNewResetPassword: { __typename?: 'MessageResponse', message: string } };

export type SignupMutationVariables = Exact<{
  input: SignUpDto;
}>;


export type SignupMutation = { __typename?: 'Mutation', signup: { __typename?: 'User', name: string, email: string, avatar?: string | undefined, _id: string } };

export type ProfileQueryVariables = Exact<{ [key: string]: never; }>;


export type ProfileQuery = { __typename?: 'Query', profile: { __typename?: 'User', name: string, email: string, avatar?: string | undefined, _id: string, gender?: GenderEnum | undefined, dob?: any | undefined } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', _id: string, color: string, image: string, name: string, slug: string, questionCount: number }> };

export type GetPdfsQueryVariables = Exact<{
  page: Scalars['Int']['input'];
  limit: Scalars['Int']['input'];
  filter?: InputMaybe<PdfFilterDto>;
}>;


export type GetPdfsQuery = { __typename?: 'Query', pdfs: { __typename?: 'PaginatedPdfResponse', totalDocs: number, totalPages: number, prevPage?: number | undefined, page: number, nextPage?: number | undefined, limit: number, hasNextPage: boolean, hasPrevPage: boolean, docs: Array<{ __typename?: 'Pdf', _id: string, url: string, title: string, createdAt: any, updatedAt: any }> } };

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
    gender
    dob
  }
}
    `;
export const CategoriesDocument = `
    query Categories {
  categories {
    _id
    color
    image
    name
    slug
    questionCount
  }
}
    `;
export const GetPdfsDocument = `
    query GetPdfs($page: Int!, $limit: Int!, $filter: PdfFilterDto) {
  pdfs(page: $page, limit: $limit, filter: $filter) {
    docs {
      _id
      url
      title
      createdAt
      updatedAt
    }
    totalDocs
    totalPages
    prevPage
    page
    nextPage
    limit
    hasNextPage
    hasPrevPage
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
    Categories: build.query<CategoriesQuery, CategoriesQueryVariables | void>({
      query: (variables) => ({ document: CategoriesDocument, variables })
    }),
    GetPdfs: build.query<GetPdfsQuery, GetPdfsQueryVariables>({
      query: (variables) => ({ document: GetPdfsDocument, variables })
    }),
    InitiateUpload: build.mutation<InitiateUploadMutation, InitiateUploadMutationVariables>({
      query: (variables) => ({ document: InitiateUploadDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useSendForgotPasswordCodeMutation, useValidateOtpMutation, useLoginWithGoogleMutation, useLoginWithEmailMutation, useProfileUpdateMutation, useSetNewResetPasswordMutation, useSignupMutation, useProfileQuery, useLazyProfileQuery, useCategoriesQuery, useLazyCategoriesQuery, useGetPdfsQuery, useLazyGetPdfsQuery, useInitiateUploadMutation } = injectedRtkApi;

