
import Button from '@components/ui/Button';
import CheckBox from '@components/ui/CheckBox';
import {View, Text} from 'react-native';
import {navigate} from '@hooks/useNavigation.hook';
import {useLoginWithEmailMutation} from '@/graphql/generated';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormInput} from './ui/FormInput';
import {useState} from 'react';
import {useSelector} from 'react-redux';
import {selectAuth} from '@/store/auth/auth.selector';
import {useStorage} from '@/hooks/useStorage.hook';
import {REFRESH_TOKEN} from '@/types/auth';
import z from 'zod';

const LoginSchema = z.object({
  email: z.string({required_error: 'Email is required'}).email({message: 'Invalid email address'}),
  password: z.string({required_error: 'Password is required'}).min(6, {message: 'Password must be at least 8 characters long'}),
});
type LoginFormType = z.infer<typeof LoginSchema>;

export default function Login() {
  const [rememberMe, setRememberMe] = useState(false);
  const {setItem} = useStorage();
  const auth = useSelector(selectAuth);

  const [login] = useLoginWithEmailMutation();
  const {handleSubmit, control} = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: 'test@gmail.com',
      password: 'fsdkfsdfsfs',
    },
  });

  async function handleLogin(formValues: LoginFormType) {
    await login({input: formValues}).unwrap();
    if (rememberMe) {
      setItem(REFRESH_TOKEN, auth.refresh_token);
    }
    navigate('mainstack', {screen: 'home'});
  }

  return (
    <>
      <View className="gap-4">
        <FormInput name="email" control={control} label="Email" keyboardType="email-address" placeholder="john@example.com"></FormInput>
        <FormInput name="password" control={control} label="Password" secret={true} placeholder="Enter Password"></FormInput>
        <View className="flex flex-row my-2 justify-between items-center">
          <CheckBox value={rememberMe} onChecked={setRememberMe} label="Remember Me"></CheckBox>
          <Text className="font-inter text-theme" onPress={() => navigate('forgot')}>
            Forgot Password ?
          </Text>
        </View>

        <Button onPress={handleSubmit(handleLogin)} label="Login"></Button>
      </View>
    </>
  );
}
