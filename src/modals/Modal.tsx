import React from 'react';
import {Modal, Text, View, TouchableWithoutFeedback} from 'react-native'; // or 'react-native-web' if applicable

export type ModalComponentProps = {
  title?: string;
  onClose?: () => void;
  visible: boolean;
  component: React.ComponentType;
};

export const UIModalComponent = React.memo(({visible, title, onClose, component: Component}: ModalComponentProps) => {
  return (
    <Modal className="bg-white" animationType="slide" onRequestClose={onClose} visible={visible} transparent>
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-white h-auto rounded-t-3xl p-4">
          {title && <Text className="text-theme font-interBold text-2xl text-center mb-4">{title}</Text>}
          <Component />
        </View>
      </View>
    </Modal>
  );
});
