import Button from '@components/ui/Button';
import CheckBox from '@components/ui/CheckBox';
import {View, Text} from 'react-native';
import {navigate, resetRoot} from '@hooks/useNavigation.hook';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {FormInput} from './ui/Forms/FormInput';
import {selectRememberMe} from '@/store/auth/auth.selector';
import {useLoginWithEmailMutation} from '@store/auth/endpoints';
import {useAppDispatch, useRootState} from '@/store/store';
import {setRememberMe} from '@/store/auth/auth.slice';
import z from 'zod';

export const LoginSchema = z.object({
  email: z.string({required_error: 'Email is required'}).email({message: 'Invalid email address'}),
  password: z.string({required_error: 'Password is required'}).min(6, {message: 'Password must be at least 8 characters long'}),
});
export type loginType = z.infer<typeof LoginSchema>;

export default function Login() {
  const [login] = useLoginWithEmailMutation();
  const rememberMe = useRootState(selectRememberMe);
  const dispatch = useAppDispatch();

  const {handleSubmit, control} = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: 'stunningokk@gmail.com',
      password: '12345678',
    },
  });

  async function handleOnLoginClick(formValues: loginType) {
    await login({input: formValues}).unwrap();
    resetRoot('DashboardStack');
  }

  return (
    <>
      <View className="gap-4">
        <FormInput icon="email-outline" name="email" control={control} label="Email" keyboardType="email-address" placeholder="john@example.com"></FormInput>
        <FormInput icon="lock-outline" name="password" control={control} label="Password" secret={true} placeholder="Enter Password"></FormInput>
        <View className="flex flex-row my-2 justify-between items-center">
          <CheckBox value={rememberMe} onChecked={() => dispatch(setRememberMe(!rememberMe))} label="Remember Me"></CheckBox>
          <Text className="font-inter text-theme" onPress={() => navigate('AuthStack', {screen: 'ForgotPassword'})}>
            Forgot Password ?
          </Text>
        </View>

        <Button icon="login" onPress={handleSubmit(handleOnLoginClick)} label="Login"></Button>
      </View>
    </>
  );
}
