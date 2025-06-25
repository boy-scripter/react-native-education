import {RootStackNavigator} from '@/stacks/Root.stack';
import './global.css';
import {ModalProvider} from '@/modals/modal.context';


import {ReduxStore} from '@/store/store';
import { UIToast } from '@/components/Toast/Toast.config';
import 'react-native-devsettings';

export default function App() {
  return (
    <ReduxStore>
      <ModalProvider>
        <RootStackNavigator></RootStackNavigator>
      </ModalProvider>
      <UIToast  />
    </ReduxStore>
  );
}
