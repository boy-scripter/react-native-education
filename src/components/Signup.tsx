import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import {View} from 'react-native';

export default function Signup() {
  return (
    <>
      <View className="gap-2">
        <Input label="Name" keyboardType="default" placeholder="Enter Your Name"></Input>
        <Input label="Email" keyboardType="email-address" placeholder="john@example.com"></Input>
        <Input label="Password" keyboardType="default" placeholder="Enter Password"></Input>
        <Button label="Signup" className="w-full bg-theme mt-4" ></Button>
      </View>
    </>
  );
}
