import Toast, {ToastProps, ToastShowParams} from 'react-native-toast-message';
import {CustomToast} from './Toast';

export const toastConfig = {
  success: (props: any) => <CustomToast {...props} type="success" />,
  error: (props: any) => <CustomToast {...props} type="error" />,
  info: (props: any) => <CustomToast {...props} type="info" />,
  warning: (props: any) => <CustomToast {...props} type="warning" />,
};

export function UIToast() {
  return <Toast config={toastConfig} position="top" topOffset={20} />;
}

type ToastTypeProps = Omit<ToastShowParams , 'type'> 

function successToast({ text1 , text2 }:ToastTypeProps) {
  return Toast.show({
    type : 'success',
    text1 , text2
  });
}

function errorToast({text1 , text2}: ToastTypeProps) {
  return Toast.show({
    type : 'error',
    text1 , text2
  });
}

function infoToast({text1 , text2}: ToastTypeProps) {
  return Toast.show({
    type : 'info',
    text1 , text2
  });
}


export {successToast , errorToast , infoToast};
