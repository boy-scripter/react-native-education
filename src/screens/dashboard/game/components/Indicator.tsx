import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useModal} from '@/modals/modal.context';
import Button from '@/components/ui/Button';
import {navigate} from '@/hooks';
import colorConstant from '@/constant/color.constant';
import React from 'react';
import {MotiView} from 'moti';

interface IndicatorProps {
  total_questions: number;
  asked: number;
}

export const Indicator = React.memo(({total_questions, asked}: IndicatorProps) => {
  const {open} = useModal();

  const onPressIcon = () => {
    const closeModalId = open(() => <QuitModal modalId={closeModalId} />, 'Are You Want To Exit?');
  };

  return (
    <View className="flex-row mt-10 gap-6 px-2 items-center">
      <Button className="bg-transparent rounded-full border-transparent">
        <Icon onPress={onPressIcon} name="close" color="black" size={18} className="border-greyish-100 bg-white border font-interBold p-2 rounded-full" />
      </Button>
      <View className="p-3 px-4 border-2 flex-row items-center gap-2 border-greyish-100 rounded-3xl flex-1">
        <View className="flex-1 flex-row h-4 rounded-xl overflow-hidden">
          <MotiView from={{width: 0}} animate={{width: `${(asked / total_questions) * 100}%`}} transition={{type: 'timing', duration: 600}} className="bg-theme" />
          <MotiView style={{width: `${((total_questions - asked) / total_questions) * 100}%`, backgroundColor: '#bbb8b8dc'}} />
        </View>
        <Text className="text-greyish-100 font-interBold">
          {asked}/{total_questions}
        </Text>
      </View>
    </View>
  );
});

function QuitModal({modalId}: {modalId: string}) {
  const {close} = useModal();

  return (
    <View className="px-2">
      <View className="flex-row gap-2">
        <Button label="Cancel" className="mt-4 flex-1 bg-red-600 border-red-600" onPress={() => close(modalId)} />
        <Button
          label="Yes"
          className="mt-4 flex-1 bg-green-600 border-green-600"
          onPress={() => {
            close(modalId);
            navigate('DashboardStack', {screen: 'Home'});
          }}
        />
      </View>
    </View>
  );
}
