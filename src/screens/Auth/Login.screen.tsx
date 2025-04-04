import {Text, View} from 'react-native';
import {AuthLayout} from './Auth.layout';
import Tabs from '@components/ui/TabToggle';
import UITextInput from '@components/ui/Input';

export default function LoginScreen() {
  return (
    <AuthLayout>
      <Tabs defaultTab="login">
        <Tabs.Button id="login" label="Login"></Tabs.Button>
        <Tabs.Button id="signup" label="SignUp"></Tabs.Button>
      </Tabs>

      <View className='py-2 pt-6'>
        <Text>Email</Text>
        <UITextInput type='text'></UITextInput>
      </View>
    </AuthLayout>
  );
}
