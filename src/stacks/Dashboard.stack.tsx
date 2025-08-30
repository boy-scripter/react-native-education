import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/dashboard/home/home.screen';
import PdfShowScreen from '@screens/dashboard/pdf/pdfShow.screen';
import PdfViewScreen from '@screens/dashboard/pdf/pdfview';
import EditProfileScreen from '@screens/dashboard/EditProfile';
import QuizScreen from '@screens/dashboard/game/quiz.screen';
import LeaderBoardScreen from '@screens/dashboard/LeaderBoard/LeaderBoard.screen';
import ResultScreen from '@/screens/dashboard/game/result.screen';
import SheetScreen from '@/screens/dashboard/game/sheet.screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const DashboardStack: React.FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right', gestureEnabled: true}} initialRouteName="HomeTab">
      <Stack.Screen name="HomeTab" component={HomeTabs} />
      <Stack.Screen name="Quiz" component={QuizScreen} />
      <Stack.Screen name="PdfShow" component={PdfShowScreen} />
      <Stack.Screen name="PdfView" component={PdfViewScreen} />
      <Stack.Screen name="Leaderboard" component={LeaderBoardScreen} />
      <Stack.Screen name="Result" component={ResultScreen} />
      <Stack.Screen name="Sheet" component={SheetScreen} />
    </Stack.Navigator>
  );
};

const HomeTabs: React.FC = () => {
  return (
    <Tab.Navigator initialRouteName="Home" tabBar={props => <CustomTabBar {...props} />} screenOptions={{headerShown: false, animation: 'shift'}}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="EditProfile" component={EditProfileScreen} />
    </Tab.Navigator>
  );
};

const CustomTabBar: React.FC<any> = ({state, descriptors, navigation}) => {
  return (
    <View className="flex-row h-20 bg-white border-t border-gray-100 shadow-lg">
      {state.routes.map((route, index: number) => {
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const label = descriptors[route.key].options.tabBarLabel ?? descriptors[route.key].options.title ?? route.name;

        // 🔹 Hardcoded icons
        let iconName: string = 'help-circle-outline';
        if (route.name === 'Home') {
          iconName = 'home-variant';
        } else if (route.name === 'EditProfile') {
          iconName = 'account-edit';
        }

        return (
          <Pressable key={route.key} className="flex-1 justify-center items-center py-2" accessibilityRole="button" accessibilityState={isFocused ? {selected: true} : {}} onPress={onPress}>
            {({pressed}) => (
              <View className={`items-center ${pressed ? 'opacity-70' : ''}`}>
                <View className={`p-2 overflow-hidden rounded-xl ${isFocused ? 'bg-indigo-100' : ''}`}>
                  <MaterialCommunityIcons name={iconName} size={24} color={isFocused ? '#6366f1' : '#9ca3af'} />
                </View>
                <Text className={`text-xs mt-1 font-medium ${isFocused ? 'text-indigo-600' : 'text-gray-500'}`} numberOfLines={1}>
                  {label}
                </Text>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
};

export default DashboardStack;
