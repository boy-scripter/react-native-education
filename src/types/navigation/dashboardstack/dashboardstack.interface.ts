import { NavigatorScreenParams } from '@react-navigation/native';
import { IStartGame } from '@/types/quiz';

export type DashboardStackParamList = {
  Home: undefined;
  EditProfile: undefined;
  PdfView: { url: string };
  PdfShow: { category: string };
  Quiz: IStartGame;
  QuizResult: { score: number; total: number };
  Result: undefined;
  Leaderboard: undefined;
};

export type DashboardStackNavigation = NavigatorScreenParams<DashboardStackParamList>;
