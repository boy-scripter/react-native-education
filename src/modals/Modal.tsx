import React, {useState, useEffect} from 'react';
import {Modal, Text, View, TouchableWithoutFeedback} from 'react-native';

export type ModalComponentProps = {
  title?: string;
  visible: boolean;
  component: React.ComponentType;
  onClose?: () => void;
};

export const UIModalComponent = React.memo(({visible, title, onClose, component: Component}: ModalComponentProps) => {
  const [contentVisible, setContentVisible] = useState(false);

  useEffect(() => {
    if (!visible) setContentVisible(false);
  }, [visible]);

  return (
    <Modal
      animationType="slide"
      transparent
      visible={visible}
      onRequestClose={onClose}
      onShow={() => setContentVisible(true)} // show content only after modal fully opens
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 justify-end bg-black/50">
          <TouchableWithoutFeedback onPress={e => e.stopPropagation()}>
            <View className="bg-white h-auto rounded-t-3xl p-4">
              {contentVisible && (
                <>
                  {title && <Text className="text-theme font-interBold text-2xl text-center py-3">{title}</Text>}
                  <Component />
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
});
