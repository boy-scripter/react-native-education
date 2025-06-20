import React from 'react';
import { Modal, Text } from 'react-native'; // or 'react-native-web' if applicable

export type ModalComponentProps = {
  visible: boolean;
  title?: string;
  component: React.ComponentType;
};

const ModalComponent = ({ visible, title, component: Component }: ModalComponentProps) => {
  return (
    <Modal animationType="slide" visible={visible} transparent>
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

export default React.memo(ModalComponent);

