import { NavigatorScreenParams } from '@react-navigation/native';

export type DashboardStackParamList = {
  Home: undefined;
  EditProfile: undefined ;
  PdfView: { url: string };
  PdfShow: { category: string };
  Quiz: { quizId: string };
  QuizResult: { score: number; total: number };
  Result: undefined;
  Leaderboard: { topicId: string };
};

export type DashboardStackNavigation = NavigatorScreenParams<DashboardStackParamList>;
