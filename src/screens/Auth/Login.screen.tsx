import {Text} from 'react-native';
import {AuthLayout} from './Auth.layout';
import {Tabs} from '@components/ui/TabToggle';

export default function LoginScreen() {
  return (
    <AuthLayout>
      <Tabs defaultMode="login">
        <Tabs.Button id="login" label="Login"></Tabs.Button>
        <Tabs.Button id="signup" label="SignUp"></Tabs.Button>
      </Tabs>
    </AuthLayout>
  );
}
