import {RootStackNavigator} from '@/stacks/Root.stack';
import {ModalProvider} from '@/modals/modal.context';
import './global.css';

import {setupAdditionalConfig} from './additionalConfig';
import {ReduxStore} from '@/store/store';
import {UIToast} from '@/components/Toast/Toast.config';
import NetworkListener from '@/components/Network/NetworkListener';
import 'react-native-devsettings';

export default function App() {
  setupAdditionalConfig();

  return (
    <ReduxStore>
      <ModalProvider>
        <RootStackNavigator></RootStackNavigator>
      </ModalProvider>
      <UIToast />
      {/* <NetworkListener></NetworkListener> */}
    </ReduxStore>
  );
}
