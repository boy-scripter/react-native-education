import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@screens/dashboard/home.screen';
import QuizScreen from '@screens/dashboard/quiz.screen';
import LeaderBoardScreen from '@screens/dashboard/leaderboard.screen';
import QuizInstructionScreen from '@screens/dashboard/quizInstruction.screen';
import PdfViewScreen from '@screens/dashboard/pdfview.screen';
import ResultScreen from '@screens/dashboard/result.screen';
import EditProfileScreen from '@/screens/dashboard/EditProfile';

const Stack = createNativeStackNavigator();

const DashboardStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right', gestureEnabled: true}} initialRouteName="EditProfile">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      {/* <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="QuizResult" component={QuizInstructionScreen} />
      <Stack.Screen name="PdfView" component={PdfViewScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderBoardScreen} /> */}
    </Stack.Navigator>
  );
};

export default DashboardStack;
