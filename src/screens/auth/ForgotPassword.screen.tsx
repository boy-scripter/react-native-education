import {AuthStackParamList} from '@/types/navigation/authstack/authstack.interface';
import {useRouteEffect} from '@/hooks/useNavigation.hook';
import TopImageLayout from '@components/layouts/TopImage.Layout';
import Button from '@components/ui/Button';
import SplitInput from '@components/ui/SplitInput';
import React, {useState} from 'react';
import {Text, Alert} from 'react-native';
import {FormInput} from '@/components/ui/FormInput';
import z from 'zod';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';

const Step1Schema = z.object({
  email: z.string().email('Enter A Valid Email Address'),
});

const Step3Schema = z
  .object({
    newPassword: z.string().min(6, 'Password must be at least 6 characters'),
    confirmPassword: z.string(),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const ForgotPasswordScreen = () => {
  const [step, setStep] = useState(1);

  useRouteEffect<AuthStackParamList, 'ForgotPassword'>(params => {
    if (params?.step) {
      setStep(step);
    }
  });

  const {handleSubmit: handleStep1Submit, control: step1Control} = useForm({
    resolver: zodResolver(Step1Schema),
  });

  const {handleSubmit: handleStep3Submit, control: step3Control} = useForm({
    resolver: zodResolver(Step3Schema),
  });

  return (
    <TopImageLayout image={'@assets/images/forgot.png'} title="Forgot Password" description="Reset your password to regain access to your account">
      {step == 1 && (
        <>
          <Text className="text-2xl font-bold mb-5">Forgot Password</Text>
          <Text className="text-base mb-5 text-greyish-100">Enter your email address below to receive a password reset link.</Text>
          <FormInput control={step1Control} className="h-12 px-3 mb-5" placeholder="Email Address" keyboardType="email-address" name="email"  />
          <Button label="Reset Password" onPress={handleStep1Submit(handleResetPassword)}></Button>
        </>
      )}
      {step == 2 && (
        <>
          <Text className="text-2xl font-bold mb-4">Enter OTP</Text>
          <Text className="text-base text-greyish-100">We have sent an OTP to your email. Please enter it below to verify.</Text>
          <SplitInput inputClassName="text-xl w-14" onSplitChange={otp => console.log(otp)} className="mt-5 flex justify-center" count={6}></SplitInput>
          <Button label="Verify OTP" className="mt-5" onPress={() => Alert.alert('Success', 'OTP verified successfully.')}></Button>
        </>
      )}
      {step == 3 && (
        <>
          <Text className="text-2xl font-bold mb-4">Set New Password</Text>
          <Text className="text-base mb-2 text-greyish-100">Enter your new password below to reset your account password.</Text>
          <FormInput control={step3Control} name="newPassword" className="mb-5" placeholder="New Password" />
          <FormInput control={step3Control} name='confirmPassword' placeholder="Confirm Password" />
          <Button label="Reset Password" className="mt-4" onPress={handleStep3Submit(handleStep3Submit)}></Button>
        </>
      )}
    </TopImageLayout>
  );
};

export default ForgotPasswordScreen;
