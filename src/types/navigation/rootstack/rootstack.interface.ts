
import { AuthStackNavigation } from '../authstack/authstack.interface'; // adjust import path as needed
import { DashboardStackNavigation } from '../dashboardstack/dashboardstack.interface';
import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList = {
    AuthStack: AuthStackNavigation;
    DashboardStack: DashboardStackNavigation;
};

export type RootStackNavigation = NavigatorScreenParams<RootStackParamList>