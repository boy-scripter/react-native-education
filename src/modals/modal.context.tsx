import React, {Component, createContext, ReactNode, useCallback, useContext, useEffect, useState} from 'react';
import {UIModalComponent} from './Modal';
import {nanoid} from 'nanoid/non-secure';

interface ModalStructure {
  id: string;
  title?: string;
  component: React.FC<any>;
}

const ModalContext = createContext<null | ReturnType<typeof useModalContextCreator>>(null);

const useModalContextCreator = () => {
  const [modalList, setModalList] = useState<ModalStructure[]>([]);

  const getModalId = () => nanoid();

  const isModalExist = useCallback((id: string) => {
    return modalList.some(modalsConfig => modalsConfig.id === id);
  }, [modalList]);

  const open = useCallback(
    (component: React.FC<any>, title?: string) => {
      const modalId = getModalId();

      if (!isModalExist(modalId)) {
        setModalList(state => [...state, {id: modalId, title, component}]);
      }
      return modalId;
    },
    [],
  );

  const close = useCallback(
    (id: string) => {
      const modalId = id;
      console.log(modalList)

      if (isModalExist(modalId)) {
        setModalList(state => state.filter(modal => modal.id !== modalId));
      }
    },
    [modalList],
  );

  return {close, open, isModalExist, modalList};
};

const ModalRenderer = ({index = 0}: {index?: number}) => {
  const {modalList, close, isModalExist} = useModal();

  if (index >= modalList.length) return null;
  const {component: Component, title, id} = modalList[index];

  function NestedModalComponent() {
    return (
      <>
        <Component></Component>
        <ModalRenderer index={index + 1} />
      </>
    );
  }

  return <UIModalComponent key={title} title={title} onClose={() => close(id)} component={NestedModalComponent} visible={isModalExist(id)} />;
};

const ModalProvider = ({children}: {children: ReactNode}) => {
  const {open, close, modalList, isModalExist} = useModalContextCreator();

  return (
    <ModalContext.Provider value={{open, close, modalList, isModalExist}}>
      {children}
      <ModalRenderer></ModalRenderer>
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
