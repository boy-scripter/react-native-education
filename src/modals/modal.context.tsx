import React, {createContext, ReactNode, useCallback, useContext, useState} from 'react';
import {UIModalComponent} from './Modal';
import {nanoid} from 'nanoid/non-secure';
import {View} from 'react-native';

interface ModalStructure {
  id: string;
  title?: string;
  component: React.FC<any>;
}

const ModalContext = createContext<null | ReturnType<typeof useModalContextCreator>>(null);

const useModalContextCreator = () => {
  const [modal, setModal] = useState<ModalStructure | null>(null);

  const open = useCallback((component: React.FC<any>, title?: string) => {
    const modalId = nanoid();
    setModal({id: modalId, title, component});
    return modalId;
  }, []);

  const close = useCallback(() => {
    setModal(null);
  }, []);

  const isModalExist = useCallback((id: string) => modal?.id === id, [modal]);

  return {open, close, isModalExist, modal};
};

const ModalRenderer = () => {
  const {modal, close} = useModal();

  if (!modal) return null;

  const {component: Component, title, id} = modal;

  return <UIModalComponent key={id} title={title} onClose={() => close()} component={Component} visible={true} />;
};

const ModalProvider = ({children}: {children: ReactNode}) => {
  const modalContext = useModalContextCreator();

  return (
    <ModalContext.Provider value={modalContext}>
        {children}
      <View>
        <ModalRenderer />
      </View>
    </ModalContext.Provider>
  );
};

// Hook to consume context
const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('Modal Context Provider not found');
  return context;
};

export {useModal, ModalProvider};
