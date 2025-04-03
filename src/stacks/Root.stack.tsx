import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStack} from './Auth.stack';
// import DashboardStack from './Dashboard.stack';

const Stack = createStackNavigator();

export function RootStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Auth">
        <Stack.Screen name="Auth" component={AuthStack} />
        {/* <Stack.Screen name="Main" component={DashboardStack} options={{ headerShown: false }} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
