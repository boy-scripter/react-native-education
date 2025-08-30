import { NavigatorScreenParams } from '@react-navigation/native';
import { IStartGame } from '@/types/quiz';
import { HomeTabNavigation } from './HomeTab/hometab.interface';

export type DashboardStackParamList = {
  HomeTab: HomeTabNavigation;
  PdfView: { url: string };
  PdfShow: { category: string };
  Quiz: IStartGame;
  Result: undefined;
  Leaderboard: undefined;
  Sheet: { gameId : string }
};

export type DashboardStackNavigation = NavigatorScreenParams<DashboardStackParamList>;
