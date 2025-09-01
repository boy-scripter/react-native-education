import React, {useRef, useState} from 'react';
import {UIModalComponent} from './Modal';
import {nanoid} from 'nanoid/non-secure';
import {useImperativeHandle, forwardRef} from 'react';

// new parts
interface ModalStructure {
  id: string;
  title?: string;
  component: React.FC<any>;
}

export type ModalHostRef = {
  show: (component: React.FC<any>, title?: string) => string;
  hide: () => void;
  isModalExist: (id: string) => boolean;
};

const ModalHost = forwardRef<ModalHostRef>((_, ref) => {
  const modalRef = useRef<ModalStructure | null>(null);
  const [visible, setVisible] = useState(false);

  useImperativeHandle(ref, () => ({
    show: (component, title) => {
      modalRef.current = {id: nanoid(), title, component};
      setVisible(true); // trigger render once
      return modalRef.current.id;
    },
    hide: () => {
      setVisible(false);
      modalRef.current = null;
    },
    isModalExist: (id: string) => modalRef.current?.id === id,
  }));

  if (!visible || !modalRef.current) return null;

  const {component: Component, title, id} = modalRef.current;

  return (
    <UIModalComponent
      key={id}
      title={title}
      onClose={() => {
        setVisible(false);
        modalRef.current = null;
      }}
      component={Component}
      visible={visible}
    />
  );
});

export {ModalHost};
