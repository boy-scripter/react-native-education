import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { HomeScreen } from '@screens/dashboard/home.screen';


const Stack = createStackNavigator();

const DashboardStack: React.FC = () => {
  return (
  
      <Stack.Navigator initialRouteName="home" screenOptions={{headerShown : false}}>
        <Stack.Screen name="home" component={HomeScreen}  />
        {/* <Stack.Screen name="profile" component={DashboardDetails} options={{title: 'Dashboard Details'}} />
        <Stack.Screen name="quiz" component={DashboardDetails} options={{title: 'Dashboard Details'}} /> */}
      </Stack.Navigator>

  );
};

export default DashboardStack;
