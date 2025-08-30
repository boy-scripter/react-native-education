import { NavigatorScreenParams } from '@react-navigation/native';

export type HomeTabsParamList = {
    Home: undefined;
    EditProfile: undefined;
};

export type HomeTabNavigation = NavigatorScreenParams<HomeTabsParamList>;
