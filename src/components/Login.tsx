import Input from '@components/ui/Input';
import Button from '@components/ui/Button';
import CheckBox from '@components/ui/CheckBox';
import {View, Text} from 'react-native';
import {navigate} from '@hooks/useNavigation.hook';
import {useLoginWithEmailMutation} from 'src/graphql/generated';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import z from 'zod';

const LoginSchema = z.object({
  email: z.string().email({message: 'Invalid email address'}),
  password: z.string().min(6, {message: 'Password must be at least 8 characters long'}),
});
type LoginFormType = z.infer<typeof LoginSchema>;

export default function Login() {
  const [login] = useLoginWithEmailMutation();
  const { getValues, formState: {errors} } = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  async function handleLogin() {
    const formValues = getValues();
    await login({input: formValues}).then(() => navigate('mainstack', {screen: 'home'}));
  }

  return (
    <>
      <View className="gap-4">
        <>
          <Input  label="Email" keyboardType="email-address" placeholder="john@example.com"></Input>
          {errors.email?.message && <Input.TextError message={errors.email.message}></Input.TextError>}
        </>

        <>
          <Input label="Password" keyboardType="default" placeholder="Enter Password"></Input>
          {errors.password?.message && <Input.TextError message={errors.password.message}></Input.TextError>}
        </>

        <View className="flex flex-row my-2 justify-between items-center">
          <CheckBox label="Remember Me"  ></CheckBox>
          <Text className="font-inter text-theme" onPress={() => navigate('forgot')}>
            Forgot Password ?
          </Text>
        </View>

        <Button onPress={handleLogin} disabled={!Object.values(errors).length} label="Login"></Button>
      </View>
    </>
  );
}
