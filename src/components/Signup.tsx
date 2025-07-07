import Button from '@components/ui/Button';
import {View} from 'react-native';
import {FormInput} from './ui/FormInput';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {successToast} from './Toast/Toast.config';
import {useSignupMutation} from '@store/auth/endpoints';
import z from 'zod';

export const SignUpSchema = z.object({
  name: z.string({required_error: 'Name is required'}).min(4, {message: 'must conatin at least 4 characters'}),
  email: z.string({required_error: 'Email is required'}).email(),
  password: z.string({required_error: 'Password is required'}).min(8, {message: 'Password must contain at least 8 characters'}).max(25, {message: 'Password must be at most 25 characters long'}),
});
export type signUpType = z.infer<typeof SignUpSchema>;

export default function Signup() {
  const [signup] = useSignupMutation();
  const {handleSubmit, control} = useForm({
    resolver: zodResolver(SignUpSchema),
  });

  async function handleSignup(formValues: signUpType) {
    await signup({input: formValues}).unwrap();
    successToast({text1: 'Signup successful!'});
  }

  return (
    <>
      <View className="gap-2">
        <FormInput name="name" control={control} label="Name" placeholder="Enter Your Name"></FormInput>
        <FormInput name="email" control={control} label="Email" keyboardType="email-address" placeholder="john@example.com"></FormInput>
        <FormInput name="password" control={control} label="Password" placeholder="Enter Password" secret={true}></FormInput>
        <Button onPress={handleSubmit(handleSignup)} label="Signup" className="w-full bg-theme mt-4" icon="account-plus"></Button>
      </View>
    </>
  );
}
