import {createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginAndSignUpScreen from '@screens/auth/LoginAndSignUp.screen';
import ForgotPasswordScreen from '@screens/auth/ForgotPassword.screen';

const Stack = createNativeStackNavigator();
export default function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation : 'slide_from_right',
        gestureEnabled: true,
      }}
      initialRouteName="LoginAndSignup">
      <Stack.Screen name="LoginAndSignup" component={LoginAndSignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
