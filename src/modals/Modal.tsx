import React from 'react';
import { Modal, Text } from 'react-native'; // or 'react-native-web' if applicable

export type ModalComponentProps = {
  title?: string;
  onClose?: () => void;
  visible: boolean;
  component: React.ComponentType;
};

const UIModalComponent = ({ visible, title, onClose ,component: Component }: ModalComponentProps) => {
  return (
    <Modal animationType="slide" onRequestClose={onClose} visible={visible} transparent>
      <>
        {title && (
          <Text className="text-black text-2xl text-center">
            {title}
          </Text>
        )}
        <Component />
      </>
    </Modal>
  );
};

export default React.memo(UIModalComponent);

