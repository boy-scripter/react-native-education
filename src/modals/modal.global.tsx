import {createContext, ReactNode, useCallback, useContext, useState} from 'react';
import Modal from  './Modal'

interface ModalStructre {
  id : string
  component : React.ReactNode
}

const ModalContext = createContext(null);

const ModalProvider = ({children}: {children: ReactNode}) => {
  const [modalList, setModalList] = useState<ModalStructre[]>([]);


  const open = useCallback((component : ReactNode) => {
    const modalId = component
    setModalList(prev => [])
    }, []);
  const close = useCallback(() => {}, []);

  return (
    <ModalContext.Provider value={(open, close)}>
   
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const modalCtx = useContext(ModalContext);
  if (!modalCtx) throw new Error('Modal Provider Not Found');
  return modalCtx;
};
