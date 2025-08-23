import {View, Text} from 'react-native';
import {navigate} from '@hooks/useNavigation.hook';
import Icon from 'react-native-vector-icons/AntDesign';
import {useModal} from '@/modals/modal.context';
import Button from '@/components/ui/Button';

interface IndicatorProps {
  handleQuit?: () => void; // Optional callback when quitting
}

export function Indicator({handleQuit}: IndicatorProps) {
  const {open} = useModal();

  const onPressIcon = () => {
    if (handleQuit) handleQuit();
    const closeModalId = open(
      () => (
        (
          <>
            <QuitModal modalId={closeModalId}></QuitModal>
          </>
        ),
        'Are you sure?'
      ),
    );
  };

  return (
    <View className="flex-row mt-10 gap-6 px-2 items-center">
      <Icon onPress={onPressIcon} name="doubleright" color="black" size={18} className="border-greyish-100 bg-white border font-interBold p-2 rounded-full" />
      <View className="p-3 px-4 border-2 flex-row items-center gap-2 border-greyish-100 rounded-3xl flex-1">
        <View className="bg-theme rounded-xl p-1.5 flex-1"></View>
        <Text className="text-greyish-100 font-interBold">5/10</Text>
      </View>
    </View>
  );
}

function QuitModal({modalId}: {modalId: string}) {
  const {close} = useModal();

  return (
    <>
      <View className="px-2">
        <View className="flex-row gap-2">
          <Button label="Cancel" className="mt-4 flex-1 bg-red-600 border-red-600" onPress={() => close(modalId)} />
          <Button label="Yes" className="mt-4 flex-1 bg-green-600 border-green-600" />
        </View>
      </View>
    </>
  );
}
