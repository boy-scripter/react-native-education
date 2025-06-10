import {createStackNavigator} from '@react-navigation/stack';
import AuthScreen from '@screens/auth/Auth.screen';
import ForgotPasswordScreen from '@screens/auth/ForgotPassword.screen';

const Stack = createStackNavigator();
export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="auth">
      <Stack.Screen name="auth" component={AuthScreen} />
      <Stack.Screen name="forgot" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
``;
