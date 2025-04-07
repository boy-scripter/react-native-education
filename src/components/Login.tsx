import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import CheckBox from '@components/ui/CheckBox';
import {View, Text} from 'react-native';

export default function Login() {
  return (
    <>
      <View className='gap-2'>
        <Input label="Email" type="text" placeholder="john@example.com"></Input>
        <Input label="Password" type="password" placeholder="Enter Password"></Input>

        <View className="flex flex-row my-2 justify-between items-center">
          <CheckBox label="Remember Me"></CheckBox>
          <Text className="text-xs text-theme">Forgot Password ?</Text>
        </View>

        <Button label="Login" className="w-full bg-theme-100" textClassName="text-sm"></Button>
      </View>
    </>
  );
}
