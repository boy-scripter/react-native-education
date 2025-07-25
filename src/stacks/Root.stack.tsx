import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {navigationRef} from '@hooks/useNavigation.hook';
import {RootStackParamList} from '@/types/navigation';
import {useAuthBootstrap} from '@/hooks/useAuthBootStrap.hook';
import AuthStack from './Auth.stack';
import DashboardStack from './Dashboard.stack';

const Stack = createStackNavigator<RootStackParamList>();

export function RootStackNavigator() {
  const isLoggedIn = useAuthBootstrap();

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName={isLoggedIn ? 'DashboardStack' : 'AuthStack'}>
        <Stack.Screen name="AuthStack" component={AuthStack} />
        <Stack.Screen name="DashboardStack" component={DashboardStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
