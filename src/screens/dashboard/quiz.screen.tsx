import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import colorConstant from '@constant/color.constant';

const QuizScreen: React.FC = () => {
  return (
    <View className="p-5 justify-start flex-1">
      {/* question status indicator starts here */}
      <View className="flex-row mt-10 gap-6 px-2 items-center ">
        <Icon name="doubleright" color="black" size={18} className="border-greyish-100 bg-white border font-interBold p-2 rounded-full" />
        <View className="p-3 px-4 border-2 flex-row items-center gap-2 border-greyish-100  rounded-3xl flex-1">
          <View className="bg-theme-900 rounded-xl p-1.5  flex-1"></View>
          <Text className="text-greyish-100 font-interBold">5/10</Text>
        </View>
      </View>
      {/* question status indicator ends here*/}

      {/* question and answer box */}
      <View className="flex-1 justify-center ">
        <View className="w-full rounded-2xl bg-white  p-8" style={{elevation: 14}}>
          <View className="mx-auto p-2 bg-white rounded-full -mt-20 mb-5">
            {/* ciricular indicator */}
            <AnimatedCircularProgress
              children={() => (
                <View className="w-full flex-1 justify-center items-center bg-white">
                  <Text className="font-interBold text-2xl">12</Text>
                </View>
              )}
              size={90}
              width={8}
              fill={80}
              tintColor={colorConstant.theme[900]}
              backgroundColor={colorConstant.greyish.DEFAULT}
              lineCap="round"
            />
            {/* circualr indiactor ends here */}
          </View>
          <Text className="font-interBold text-xl text-theme-900 ">What is the most Poppular game thoughtout the world ?</Text>
        </View>

        {/* answer box starts here */}
        <View className="options gap-4 mt-5 w-full">
          <AnswerBox />
          <AnswerBox />
          <AnswerBox />
          <AnswerBox />
        </View>
        {/* answer box ends here */}
      </View>
    </View>
  );
};

export default QuizScreen;

interface AnswerBoxProps {
  status: 'correct' | 'incorrect' | 'idle';
  onSelect: (option: string) => void;
  selectedOption: string | null;
}

const AnswerBox: React.FC<AnswerBoxProps> = ({onSelect, selectedOption, status = 'correct'}) => {
  const option = '434';

  const isSelected = selectedOption === option;
  // Hex color based on status
  const statusHexColor = status === 'incorrect' ? '#EF4444' : status === 'correct' ? '#22C55E' : colorConstant.greyish[100]; // Tailwind greyish-100
  const iconName = status === 'incorrect' ? 'close' : status === 'correct' ? 'check' : null;

  return (
    <View style={{borderColor:statusHexColor}} className={`p-3 pr-6 flex-row justify-between border-2 rounded-xl `}>
     
      <Text className={`font-interBold ${isSelected ? 'text-white' : 'text-greyish-900'}`} onPress={() => onSelect(option)}>
        {option}
      </Text>

      <View style={{borderColor:statusHexColor}} className={`border rounded-full  overflow-hidden `}>{iconName && <Icon style={{backgroundColor:statusHexColor}} className='p-1' name={iconName} color="white" size={19} />}</View>
    </View>
  );
};
