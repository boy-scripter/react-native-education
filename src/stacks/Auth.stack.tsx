import {createStackNavigator} from '@react-navigation/stack';
import {AuthScreen} from '@screens/Auth.screen';

const Stack = createStackNavigator();
export function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="auth">
      <Stack.Screen name="auth" component={AuthScreen} />
    </Stack.Navigator>
  );
}
``;
