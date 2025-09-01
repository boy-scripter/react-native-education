import React, {useRef, useEffect} from 'react';
import {ModalHostRef, ModalHost} from './modal.context';
import {View} from 'moti';

let modalRef: ModalHostRef | null = null;

export const setModalRef = (ref: ModalHostRef | null) => {
  modalRef = ref;
};

export const ModalService = {
  show: (component: React.FC<any>, title?: string) => {
    return modalRef?.show(component, title) ?? '';
  },
  hide: () => {
    modalRef?.hide();
  },
  isModalExist: (id: string) => {
    return modalRef?.isModalExist(id) ?? false;
  },
};

export const ModalRoot = () => {
  const ref = useRef<ModalHostRef>(null);
  useEffect(() => {
    setModalRef(ref.current);
  }, []);
  return (
    <View>
      <ModalHost ref={ref} />
    </View>
  );
};
