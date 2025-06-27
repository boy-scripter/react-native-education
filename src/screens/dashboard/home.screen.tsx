import {selectUser} from '@/store/auth/auth.selector';
import {AuthenticatedUser} from '@/types/auth';
import Button from '@components/ui/Button';
import colorConstant from '@constant/color.constant';
import {navigate} from '@hooks/useNavigation.hook';
import {Image} from 'react-native';
import {Text, View, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';

export default function HomeScreen() {
  const user = useSelector(selectUser) as unknown as AuthenticatedUser['user'];

  const options = [
    {
      name: 'Math Quiz',
      quiz_route: 'quiz_instruction',
      pdf: 'pdfview',
      image: 'https://example.com/math-quiz.png',
      question: Math.floor(Math.random() * (40 - 3 + 1)) + 3,
    },
    {
      name: 'Science Trivia',
      quiz_route: 'quiz_instruction',
      pdf: 'pdfview',
      image: 'https://example.com/science-trivia.png',
      question: Math.floor(Math.random() * (40 - 3 + 1)) + 3,
    },
    {
      name: 'Science Trivia',
      quiz_route: 'quiz_instruction',
      pdf: 'pdfview',
      image: 'https://example.com/science-trivia.png',
      question: Math.floor(Math.random() * (40 - 3 + 1)) + 3,
    },
  ];

  return (
    <ScrollView className="px-4 py-4 mt-2 ">
      <View className="flex flex-row justify-between">
        <View className="self-end">
          <Text className="font-interBold text-xl">Hi, {user.name}</Text>
          <Text>Let's Make this Day Productive</Text>
        </View>
        <Image className="h-16 w-16 rounded-full" source={user.avatar} />
      </View>

      <View style={{elevation: 14}} className="mt-5 w-full px-4 mx-auto flex flex-row p-8 bg-white shadow-white overflow-hidden rounded-xl justify-evenly ">
        <View className="flex-row items-center">
          <Image className="w-10 h-10" source={require('@assets/images/trophy.png')} resizeMode="contain" />
          <View className="pl-3 flex justify-center">
            <Text>Ranking</Text>
            <Text className="font-interBold text-theme ">100</Text>
          </View>
        </View>

        <View className="w-px bg-theme mx-4" />

        <View className="flex-row  flex-start items-center">
          <Image className="w-10 h-10" source={require('@assets/images/coin.png')} resizeMode="contain" />
          <View className="pl-3 flex justify-center">
            <Text>Points</Text>
            <Text className="font-interBold text-theme ">100</Text>
          </View>
        </View>
      </View>
      <Button onPress={() => navigate('leaderboard')} label="Check Leaderboard" className="flex-row mt-4 items-center">
        <Icon name="trophy-outline" size={30} color={'yellow'} />
      </Button>
      <View className="mt-6">
        <Text className="font-interBold text-theme text-xl mb-4">Let's Play</Text>
        <View className="flex-row flex-wrap gap-x-4 gap-y-5 ">
          {options.map((currentObject, index) => {
            return (
              <View style={{elevation: 14}} key={index} className={`${index % 2 === 0 && 'translate-y-6'} relative rounded-xl basis-[48%] bg-white shadow-white p-5 px-6`}>
                <Image className="w-28 h-28 -mt-[28]" source={require('@assets/images/coin.png')} resizeMode="contain" />
                <Text className="mt-2 font-interBold">{currentObject.name}</Text>
                <Text className="my-1 font-interBold text-xs text-greyish-200">{currentObject.question} Questions</Text>
                <View className="absolute rounded-xl border border-greyish-100 top-0 right-2 justify-between mt-2">
                  <Icon onPress={() => navigate(currentObject.quiz_route)} name="play" size={30} className=" p-1 " color={colorConstant.theme.DEFAULT}></Icon>
                  <Icon onPress={() => navigate(currentObject.pdf)} name="file-pdf-box" size={30} className=" p-1 " color={colorConstant.theme.DEFAULT}></Icon>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
