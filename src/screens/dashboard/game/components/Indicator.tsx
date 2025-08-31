import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import {MotiView} from 'moti';
import Icon from 'react-native-vector-icons/AntDesign';
import {useModal} from '@/modals/modal.context';
import Button from '@/components/ui/Button';
import {navigate, replace} from '@/hooks';
import colorConstant from '@/constant/color.constant';

interface IndicatorProps {
  total_questions: number;
  asked: number;
}

export const Indicator = React.memo(({total_questions, asked}: IndicatorProps) => {
  const {open} = useModal();

  const onPressIcon = useCallback(() => open(() => <QuitModal />, 'Are You Want To Exit?'), []);
  const progressRatio = Math.min(asked / total_questions, 1);

  return (
    <View className="flex-row mt-10 gap-6 px-2 items-center">
      {/* Close Button */}
      <Button className="bg-transparent rounded-full border-transparent">
        <Icon onPress={onPressIcon} name="close" color="black" size={18} className="border-greyish-100 bg-white border font-interBold p-2 rounded-full" />
      </Button>

      {/* Progress Bar Container */}
      <View className="p-3 px-4 border-2 flex-row items-center gap-2 border-greyish-100 rounded-3xl flex-1">
        <View className="flex-1 h-4 bg-gray-300 rounded-xl overflow-hidden">
          <MotiView
            from={{scaleX: 0}}
            animate={{scaleX: progressRatio}}
            transition={{type: 'timing', duration: 200}}
            style={{backgroundColor: colorConstant.theme.DEFAULT, height: '100%', transformOrigin: 'left'}}
          />
        </View>
        <Text className="text-greyish-100 font-interBold">
          {asked}/{total_questions}
        </Text>
      </View>
    </View>
  );
});

function QuitModal() {
  const {close} = useModal();

  return (
    <View className="px-2">
      <View className="flex-row gap-2">
        <Button label="Cancel" className="mt-4 flex-1 bg-red-600 border-red-600" onPress={() => close()} />
        <Button
          label="Yes"
          className="mt-4 flex-1 bg-green-600 border-green-600"
          onPress={() => {
            close();
            replace('DashboardStack', {screen: 'HomeTab', params: {screen: 'Home'}});
          }}
        />
      </View>
    </View>
  );
}
