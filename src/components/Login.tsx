import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import CheckBox from '@components/ui/CheckBox';
import {View, Text} from 'react-native';
import {navigate} from '@hooks/useNavigation.hook';
import {useLoginWithEmailMutation} from '@/graphql/generated';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormInput} from './ui/FormInput';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAuth } from '@/store/auth/auth.selector';
import { useStorage } from '@/hooks/useStorage.hook';
import z from 'zod';
import { REFRESH_TOKEN } from '@/types/auth';

const LoginSchema = z.object({
  email: z.string().email({message: 'Invalid email address'}),
  password: z.string().min(6, {message: 'Password must be at least 8 characters long'}),
});
type LoginFormType = z.infer<typeof LoginSchema>;

export default function Login() {

  const [rememberMe , setRememberMe] = useState(false)
  const { setItem } = useStorage()
  const auth = useSelector(selectAuth) 
  const [login] = useLoginWithEmailMutation();
  const { getValues, formState: {errors , isValid},  control } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: 'test@gmail.com',
      password: 'fsdkfsdfsfs',
    },
  });

  async function handleLogin() {
    const formValues = getValues();
    await login({input: formValues});
    console.log('test')
    if (rememberMe){
        setItem(REFRESH_TOKEN, auth.refresh_token);
    }
    navigate('mainstack', { screen: 'home' })
  }

  return (
    <>
      <View className="gap-4">
        <FormInput name="email" control={control} label="Email" keyboardType="email-address" placeholder="john@example.com"></FormInput>

        <FormInput name="password" control={control} label="Password" keyboardType="default" secret={true} placeholder="Enter Password"></FormInput>

        <View className="flex flex-row my-2 justify-between items-center">
          <CheckBox value={rememberMe} onChecked={setRememberMe} label="Remember Me"></CheckBox>
          <Text className="font-inter text-theme" onPress={() => navigate('forgot')}>  Forgot Password ?  </Text>
        </View>

        <Button onPress={handleLogin} disabled={!isValid} label="Login"></Button>
      </View>
    </>
  );
}
