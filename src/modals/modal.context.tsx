import React, {Component, createContext, ReactNode, useCallback, useContext, useState} from 'react';
import UIModalComponent from './Modal'
import { nanoid } from 'nanoid'

interface ModalStructure {
  id: string;
  title? : string;
  component: React.FC<any>;
}

const ModalContext = createContext<null | ReturnType<typeof udseModalContextCreator>>(null);

const udseModalContextCreator = () => {
  const [modalList, setModalList] = useState<ModalStructure[]>([]);

  const getModalId = () => nanoid();

  function isModalExist(id: string) {
    return modalList.some(modalsConfig => modalsConfig.id === id);
  }

  const open = useCallback((component: React.FC<any> , title? : string) => {
    const modalId = getModalId();

    if (!isModalExist(modalId)) {
      setModalList(state =>
        state.concat({
          id: modalId,
          title,
          component,
        }),
      );
    }
    return modalId
  }, []);

  const close = useCallback((id: string ) => {
    const modalId = id ;

    if (isModalExist(modalId)) {
      setModalList(state => state.filter(modal => modal.id !== modalId));
    }
  }, []);

  return {close, open, modalList };
};

const ModalRenderer = ( {  index = 0 } : { index ?: number }) => {
  const { modalList , close  } = useModal()
  if (index >= modalList.length) return null;
  const { component : Component , title,id } = modalList[index];

  function NestedModalComponent() {
      return (
      <>
         <Component ></Component>
         <ModalRenderer index={index + 1}/>
      </>
      )
  }

  return(
    <UIModalComponent key={title} title={title} onClose={()=> close(id)} component={NestedModalComponent} visible={true} />
  )

}


 const ModalProvider = ({children}: {children: ReactNode}) => {
  const {open, close, modalList } = udseModalContextCreator();

  return (
    <ModalContext.Provider value={{open, close, modalList}}>
      {children}
      <ModalRenderer></ModalRenderer>
    </ModalContext.Provider>
  );
};

// Hook to consume context
 const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error("ModalContext.Provider not found");
  return context;
};

export { useModal , ModalProvider}