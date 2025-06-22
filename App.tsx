import {RootStackNavigator} from '@/stacks/Root.stack';
import './global.css';
import {ModalProvider} from '@/modals/modal.context';

import Toast from 'react-native-toast-message';
import { ReduxStore } from '@/store/store';

export default function App() {
  return (
    <ReduxStore>
        <ModalProvider>
        <Toast position='top' topOffset={20}  />
        <RootStackNavigator></RootStackNavigator>
      </ModalProvider>
    </ReduxStore>
  );
}
