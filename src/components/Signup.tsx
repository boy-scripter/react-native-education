
import Button from '@components/ui/Button';
import {View} from 'react-native';
import z from 'zod';
import {FormInput} from './ui/FormInput';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {useSignupMutation} from '@/graphql/generated';
import { successToast } from './Toast/Toast.config';


const signUpSchema = z.object({
  name: z.string().min(4).default(''),
  email: z.string().email().default(''),
  password: z.string().min(8).max(25).default(''),
});

type signUpType = z.infer<typeof signUpSchema>;

export default function Signup() {
  const [Signup] = useSignupMutation();

  const {
    getValues,
    control,
    formState: {errors , isValid},
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  async function handleOnSubmit() {
    const formValues = getValues() as Required<signUpType>;
    await Signup({ input: formValues });
    successToast({
      text1: 'Signup successful!',
    });
  }

  return (
    <>
      <View className="gap-2">
        <FormInput name="name" control={control} label="Name" errorMessage={errors.name?.message} keyboardType="default" placeholder="Enter Your Name"></FormInput>
        <FormInput name="email" control={control} label="Email" errorMessage={errors.email?.message} keyboardType="email-address" placeholder="john@example.com"></FormInput>
        <FormInput secret={true} name="password" control={control} label="Password" errorMessage={errors.password?.message} keyboardType="default" placeholder="Enter Password"></FormInput>
        <Button onPress={handleOnSubmit} disabled={!isValid} label="Signup" className="w-full bg-theme mt-4"></Button>
      </View>
    </>
  );
}
