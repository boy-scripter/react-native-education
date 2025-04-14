import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import CheckBox from '@components/ui/CheckBox';
import {View, Text} from 'react-native';

export default function Signup() {
  return (
    <>
      <View className="gap-2">
        <Input label="Name" type="text" placeholder="Enter Your Name"></Input>
        <Input label="Email" type="text" placeholder="john@example.com"></Input>
        <Input label="Password" type="password" placeholder="Enter Password"></Input>
        <Button label="Signup" className="w-full bg-theme-100 mt-4" ></Button>
      </View>
    </>
  );
}
