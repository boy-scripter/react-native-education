import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import CheckBox from '@components/ui/CheckBox';
import {View, Text} from 'react-native';
import {navigate} from '@hooks/useNavigation.hook';

export default function Login() {
  return (
    <>
      <View className="gap-4">
        <Input label="Email" keyboardType="email-address" placeholder="john@example.com"></Input>
        <Input label="Password" keyboardType="default" placeholder="Enter Password"></Input>

        <View className="flex flex-row my-2 justify-between items-center">
          <CheckBox label="Remember Me"></CheckBox>
          <Text className="font-inter text-theme" onPress={() => navigate('forgot')}>
            Forgot Password ?
          </Text>
        </View>

        <Button label="Login"></Button>
      </View>
    </>
  );
}
