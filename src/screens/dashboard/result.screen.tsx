import React from 'react';
import Button from '@components/ui/Button';
import colorConstant from '@constant/color.constant';
import {navigate} from '@hooks/useNavigation.hook';
import {View, Text, Share} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import RippleEffect from '@animation/RippleEffect';

const ResultScreen: React.FC = () => {
  const buttons = [
    {label: 'Play Again', icon: 'reload', action: () => console.log('Play Again')},
    {label: 'Home', icon: 'home', action: () => navigate('home')},
    {label: 'Share', icon: 'share-variant', action: () => Share.share({message: 'Check out my quiz results!'})},
    {label: 'See PDF', icon: 'file-pdf-box', action: () => console.log('See PDF')},
  ];

  return (
    <View className="flex-1 py-5 px-5  justify-center ">
      <View className="">
        {/* circle */}
        <View className="flex w-full mx-auto items-center">
          <RippleEffect count={5} color={colorConstant.greyish[200]} className="rounded-full">
            <View className="w-44 h-44 mx-auto rounded-full bg-theme items-center justify-center">
              <Text className="text-lg text-white font-interBold">Your Score</Text>
              <Text className="text-3xl text-white font-interBold">86</Text>
              <Text className=" text-white font-interBold">points</Text>
            </View>
          </RippleEffect>
        </View>
        {/* circle end */}

        {/* box information start */}
        <View style={{elevation: 14}} className="flex  rounded-xl flex-wrap bg-white shadow-slate-300 flex-row justify-between w-full px-2 py-4 gap-2 mt-14">
          <View className="w-[48%] py-4 items-center justify-center ">
            <Text className="text-lg font-interBold">Correct</Text>
            <Text className="text-2xl font-interBold">15</Text>
          </View>
          <View className="w-[48%] py-4  items-center justify-center ">
            <Text className="text-lg font-interBold">Incorrect</Text>
            <Text className="text-2xl font-interBold">5</Text>
          </View>
          <View className="w-[48%] py-4 items-center justify-center ">
            <Text className="text-lg font-interBold">Skipped</Text>
            <Text className="text-2xl font-interBold">3</Text>
          </View>

          <View className="w-[48%] py-4 items-center justify-center ">
            <Text className="text-lg font-interBold">Total</Text>
            <Text className="text-2xl font-interBold">23</Text>
          </View>
        </View>
        {/* box information end */}

        {/* btns */}
        <View className="mt-12 flex-wrap flex-row justify-between">
          {buttons.map((button, index) => (
            <View key={index} className="w-[48%] mb-4">
              <Button label={button.label} onPress={button.action}>
                <Icon name={button.icon} size={20} color="white" />
              </Button>
            </View>
          ))}
        </View>
        {/* btns end */}
      </View>
    </View>
  );
};
export default ResultScreen;
