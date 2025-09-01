import {RootStackNavigator} from '@/stacks/Root.stack';
import './global.css';

import {setupAdditionalConfig} from './additionalConfig';
import {ReduxStore} from '@/store/store';
import {UIToast} from '@/components/Toast/Toast.config';
import {ModalRoot} from '@/modals';
import {NetworkListener} from '@/components/Network';
import 'react-native-devsettings';

export default function App() {
  setupAdditionalConfig();

  return (
    <ReduxStore>
      <RootStackNavigator></RootStackNavigator>
      <UIToast />
      <ModalRoot></ModalRoot>
      <NetworkListener></NetworkListener>
    </ReduxStore>
  );
}
