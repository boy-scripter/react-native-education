import {RootStackNavigator} from '@/stacks/Root.stack';
import {ModalProvider} from '@/modals/modal.context';
import './global.css';

import {setupAdditionalConfig} from './additionalConfig';
import {ReduxStore} from '@/store/store';
import {UIToast} from '@/components/Toast/Toast.config';
import 'react-native-devsettings';

export default function App() {
  setupAdditionalConfig();

  return (
    <ReduxStore>
      <ModalProvider>
        <RootStackNavigator></RootStackNavigator>
      </ModalProvider>
      <UIToast />
    </ReduxStore>
  );
}
