import {selectUser} from '@/store/auth/auth.selector';
import {useRootState} from '@/store/store';
import {AuthenticatedUser} from '@/types/auth';
import {navigate} from '@hooks/useNavigation.hook';
import {Text, View, ScrollView} from 'react-native';
import Img from '@/components/ui/Img';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '@components/ui/Button';
import ProfileImage from '@assets/images/profile.png';
import LinearGradient from 'react-native-linear-gradient';

const options = [
  {
    name: 'Mathematics Quiz',
    quiz_route: 'quiz_instruction',
    pdf: 'pdfview',
    image: 'https://cdn-icons-png.flaticon.com/512/3771/3771275.png',
    question: Math.floor(Math.random() * (40 - 3 + 1)) + 3,
    color: '#3B82F6', // Blue
  },
  {
    name: 'Science Trivia',
    quiz_route: 'quiz_instruction',
    pdf: 'pdfview',
    image: 'https://cdn-icons-png.flaticon.com/512/2620/2620462.png',
    question: Math.floor(Math.random() * (40 - 3 + 1)) + 3,
    color: '#10B981', // Green
  },
  {
    name: 'History Challenge',
    quiz_route: 'quiz_instruction',
    pdf: 'pdfview',
    image: 'https://cdn-icons-png.flaticon.com/512/3002/3002543.png',
    question: Math.floor(Math.random() * (40 - 3 + 1)) + 3,
    color: '#8B5CF6', // Purple
  },
  {
    name: 'Geography Test',
    quiz_route: 'quiz_instruction',
    pdf: 'pdfview',
    image: 'https://cdn-icons-png.flaticon.com/512/2784/2784403.png',
    question: Math.floor(Math.random() * (40 - 3 + 1)) + 3,
    color: '#F59E0B', // Orange
  },
  {
    name: 'Literature Quiz',
    quiz_route: 'quiz_instruction',
    pdf: 'pdfview',
    image: 'https://cdn-icons-png.flaticon.com/512/3145/3145765.png',
    question: Math.floor(Math.random() * (40 - 3 + 1)) + 3,
    color: '#EC4899', // Pink
  },
  {
    name: 'Physics Advanced',
    quiz_route: 'quiz_instruction',
    pdf: 'pdfview',
    image: 'https://cdn-icons-png.flaticon.com/512/2942/2942156.png',
    question: Math.floor(Math.random() * (40 - 3 + 1)) + 3,
    color: '#6366F1', // Indigo
  },
];

export default function HomeScreen() {
  const user = useRootState(selectUser) as unknown as AuthenticatedUser['user'];

  return (
    <ScrollView className="px-4 py-4 mt-2 ">
      <View className="flex flex-row justify-between">
        <View className="self-end">
          <Text className="font-interBold text-xl">Hi, {user.name}</Text>
          <Text>Let's Make this Day Productive</Text>
        </View>
        <View>
          <Img fallbackUri={ProfileImage} onPress={() => navigate('DashboardStack', {screen: 'EditProfile'})} className="w-16 h-16 rounded-lg overflow-hidden" source={user.avatar} />
       </View>
      </View>

      <RankingAndLeaderboard />

      <View className="py-6">
        <View className="flex-col gap-4">
          {options.map((currentObject, index) => (
            <QuizCardComponent key={index} {...currentObject} />
          ))}
        </View>
      </View>

    </ScrollView>
  );
}

export function RankingAndLeaderboard() {
  return (
    <>
      <View className="mt-5 w-full mx-auto rounded-3xl  py-4">
        <View className="flex-row gap-5 justify-around items-center">
          {/* Rank Box */}
          <View className="flex-row flex-grow  items-center bg-yellow-50 rounded-2xl px-4 py-3 gap-3 shadow-sm">
            <LinearGradient colors={['#facc15', '#fbbf24']} className="p-3 rounded-lg overflow-hidden shadow">
              <Img source={require('@assets/images/trophy.png')} className="w-6 h-6 overflow-hidden rounded-lg" resizeMode="contain" />
            </LinearGradient>
            <View>
              <Text className="text-xs text-gray-600">Your Rank</Text>
              <Text className="text-lg font-interBold text-yellow-600">#100</Text>
            </View>
          </View>

          {/* Points Box */}
          <View className="flex-row flex-grow  items-center bg-blue-50 rounded-2xl px-4 py-3 gap-3 shadow-sm">
            <LinearGradient colors={['#38bdf8', '#0ea5e9']} className="p-3 rounded-lg overflow-hidden shadow">
              <Img source={require('@assets/images/coin.png')} className="w-6 h-6 overflow-hidden rounded-lg" resizeMode="contain" />
            </LinearGradient>
            <View>
              <Text className="text-xs text-gray-600">Total Points</Text>
              <Text className="text-lg font-interBold text-sky-600">1200</Text>
            </View>
          </View>
        </View>
      </View>
      {/* checdk learborad button */}
      <Button onPress={() => navigate('AuthStack', {screen: 'LoginAndSignup'})} label="Check Leaderboard" className="flex-row mt-1 items-center">
        <Icon name="trophy-outline" size={30} color={'yellow'} />
      </Button>
    </>
  );
}


interface QuizCardProps {
  name: string;
  quiz_route: string;
  pdf: string;
  image: string;
  question: number;
  color: string; // Blue
}

export function QuizCardComponent({image, name, color, question}: QuizCardProps) {
  const overlayColor = color + '80'; // appending '80' for ~50% opacity in hex

  return (
    <View style={{elevation: 14}} className="flex-row w-full h-40 p-2 rounded-2xl overflow-hidden bg-white shadow-xl">
      {/* Left: Image with overlay */}
      <View className="w-2/5 h-full relative rounded-xl overflow-hidden ">
        <Img className="py-2" source={image} resizeMode="contain" />
        <View style={{backgroundColor: overlayColor}} className="absolute rounded-xl inset-0" />
        <View className="absolute top-3 left-3 bg-white/90 rounded-full px-3 py-1 shadow">
          <Text className="text-gray-800 text-xs font-interBold">Quiz</Text>
        </View>
      </View>

      {/* Right: Content */}
      <View className="flex-1 px-4 py-2 justify-between">
        <View>
          <Text numberOfLines={2} className="text-lg font-interBold text-gray-900">
            {name}
          </Text>
          <Text className="mt-1 text-xs text-gray-500 font-inter">{question} Questions</Text>
        </View>

        <View className="flex-col gap-2">
          <Button icon="play" label="Play" iconSize={18} className="px-3 py-1 rounded-lg" iconPosition="left" style={{backgroundColor: color}} />
          <Button icon="file-pdf-box" label="Learn" iconSize={18} className="px-3 py-1 rounded-lg" iconPosition="left" style={{backgroundColor: color}} />
        </View>
      </View>
    </View>
  );
}
