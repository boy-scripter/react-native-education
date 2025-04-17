import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '@screens/dashboard/home.screen';
import QuizScreen from '@screens/dashboard/quiz.screen';
import LeaderBoardScreen from '@screens/dashboard/leaderboard.screen';
import QuizInstructionScreen from '@screens/dashboard/quizInstruction.screen';
import PdfViewScreen from '@screens/dashboard/pdfview.screen';
import ResultScreen from '@screens/dashboard/result.screen';

const Stack = createStackNavigator();

const DashboardStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="result" screenOptions={{headerShown: false}}>
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="quiz" component={QuizScreen} />
      <Stack.Screen name="quiz_instruction" component={QuizInstructionScreen} />
      <Stack.Screen name="pdfview" component={PdfViewScreen} />
      <Stack.Screen name="result" component={ResultScreen} />
      <Stack.Screen name="leaderboard" component={LeaderBoardScreen} />
    </Stack.Navigator>
  );
};

export default DashboardStack;
