import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from '@screens/Auth.screen';
import ForgotPasswordScreen from '@screens/ForgotPassword.screen';

const Stack = createStackNavigator();
export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="forgot">
      <Stack.Screen name="auth" component={AuthScreen} />
      <Stack.Screen name="forgot" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
``;
