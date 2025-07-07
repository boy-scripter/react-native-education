import { NavigatorScreenParams } from '@react-navigation/native';

export type DashboardStackParamList = {
  Home: undefined;
  Quiz: { quizId: string };
  QuizResult: { score: number; total: number };
  PdfView: { url: string };
  Result: undefined;
  Leaderboard: { topicId: string };
  EditProfile: undefined ;
};

export type DashboardStackNavigation = NavigatorScreenParams<DashboardStackParamList>;
