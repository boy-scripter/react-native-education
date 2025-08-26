import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@screens/dashboard/home/home.screen';
import PdfShowScreen from '@screens/dashboard/pdf/pdfShow.screen';
import PdfViewScreen from '@screens/dashboard/pdf/pdfview';
import EditProfileScreen from '@screens/dashboard/EditProfile';
import QuizScreen from '@screens/dashboard/game/quiz.screen';
import LeaderBoardScreen from '@screens/dashboard/LeaderBoard/LeaderBoard.screen';
import ResultScreen from '@/screens/dashboard/game/result.screen';
// import QuizInstructionScreen from '@screens/dashboard/quizInstruction.screen';
// import ResultScreen from '@screens/dashboard/result.screen';

const Stack = createNativeStackNavigator();

const DashboardStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right', gestureEnabled: true}} initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="PdfShow" component={PdfShowScreen} />
      <Stack.Screen name="PdfView" component={PdfViewScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderBoardScreen} />
      <Stack.Screen name="Result" component={ResultScreen} /> 
  
    </Stack.Navigator>
  );
};

export default DashboardStack;
