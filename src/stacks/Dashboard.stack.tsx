import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import { HomeScreen } from '@screens/dashboard/home.screen';
import QuizScreen from '@screens/dashboard/quiz.screen';


const Stack = createStackNavigator();

const DashboardStack: React.FC = () => {
  return (
  
      <Stack.Navigator initialRouteName="quiz" screenOptions={{headerShown : false}}>
        <Stack.Screen name="home" component={HomeScreen}  />
        <Stack.Screen name="quiz" component={QuizScreen} /> 
        {/* {/* <Stack.Screen name="profile" component={DashboardDetails} options={{title: 'Dashboard Details'}} /> */}
      </Stack.Navigator>

  );
};

export default DashboardStack;
