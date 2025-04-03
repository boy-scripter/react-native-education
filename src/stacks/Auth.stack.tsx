import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/Auth/Login.screen';
import SignupScreen from '../screens/Auth/Signup.screen';

const Stack = createStackNavigator();
export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
}
