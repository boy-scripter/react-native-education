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
    <Stack.Navigator screenOptions={{headerShown : false}} initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      {/* <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="QuizResult" component={QuizInstructionScreen} />
      <Stack.Screen name="PdfView" component={PdfViewScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderBoardScreen} /> */}
    </Stack.Navigator>
  );
};

export default DashboardStack;
