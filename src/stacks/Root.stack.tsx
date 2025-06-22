import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator } from '@react-navigation/stack';
import {AuthStack} from './Auth.stack';
import { navigationRef } from '@hooks/useNavigation.hook';
import DashboardStack from './Dashboard.stack';



const Stack = createStackNavigator();

export function RootStackNavigator() {
  
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{   headerShown: false }} initialRouteName="authstack">
        <Stack.Screen name="authstack" component={AuthStack} />
        <Stack.Screen name="mainstack" component={DashboardStack}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
