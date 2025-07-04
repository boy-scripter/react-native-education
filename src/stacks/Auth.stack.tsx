import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LoginAndSignUpScreen from '@screens/auth/LoginAndSignUp.screen';
import ForgotPasswordScreen from '@screens/auth/ForgotPassword.screen';

const Stack = createStackNavigator();
export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, ...TransitionPresets.SlideFromRightIOS, gestureEnabled: true}} initialRouteName="LoginAndSignup">
      <Stack.Screen name="LoginAndSignup" component={LoginAndSignUpScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  );
}
