import React, {Component, createContext, ReactNode, useCallback, useContext, useState} from 'react';
import Modal from './Modal';
import {id} from 'zod/v4/locales';

interface ModalStructure {
  id: string;
  component: React.FC<any>;
}

const ModalContext = createContext<null | ReturnType<typeof useModalContextCreator>>(null);

const useModalContextCreator = () => {
  const [modalList, setModalList] = useState<ModalStructure[]>([]);

  const getModalId = (component: React.FC<any>) => component.name;

  function isModalExist(id: string) {
    return modalList.some(modalsConfig => modalsConfig.id === id);
  }

  const open = useCallback((component: React.FC<any>) => {
    const modalId = getModalId(component);

    if (!isModalExist(modalId)) {
      setModalList(state =>
        state.concat({
          id: modalId,
          component,
        }),
      );
    }
  }, []);

  const close = useCallback((identifier: string | React.FC<any>) => {
    const modalId = typeof identifier != 'string' ? getModalId(identifier) : identifier;

    if (isModalExist(modalId)) {
      setModalList(state => state.filter(modal => modal.id !== modalId));
    }
  }, []);

  return {close, open, modalList};
};

const ModalRenderer = () => {
  
}


const ModalProvider = ({children}: {children: ReactNode}) => {
  const {open, close, modalList} = useModalContextCreator();

  return (
    <ModalContext.Provider value={{open, close, modalList}}>
      {children}
      {
        modalList.map(
          (currentModal, index) => {
          return  <Modal key={index} component={currentModal.component}> </Modal>;
        })
      }
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const modalCtx = useContext(ModalContext);
  if (!modalCtx) throw new Error('Modal Provider Not Found');
  return modalCtx;
};
