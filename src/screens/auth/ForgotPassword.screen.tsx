import {AuthStackParamList} from '@/types/navigation/authstack/authstack.interface';
import {navigate, useRouteEffect} from '@/hooks/useNavigation.hook';
import TopImageLayout from '@components/layouts/TopImage.Layout';
import Button from '@components/ui/Button';
import SplitInput from '@components/ui/SplitInput';
import React, {useState, useRef} from 'react';
import {Text, View} from 'react-native';
import {FormInput} from '@/components/ui/FormInput';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {errorToast, successToast} from '@/components/Toast/Toast.config';
import {useSendForgotPasswordCodeMutation, useSetNewResetPasswordMutation, useValidateOtpMutation} from '@store/auth/endpoints';
import {StepsAnimation} from '@/animation/StepsAnimation';
import CountdownTimer, {CountdownTimerRef} from '@/components/ui/CountDownTimer';


import z from 'zod';

const Step1Schema = z.object({
  email: z.string({required_error: 'Email is required'}).email('Enter a valid email address'),
});
type Step1SchemaType = z.infer<typeof Step1Schema>;

const Step3Schema = z
  .object({
    password: z.string({required_error: 'Password Is Required'}).min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string({required_error: 'Confirm Password Is Required'}),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });
type Step3SchemaType = z.infer<typeof Step3Schema>;

const ForgotPasswordScreen = () => {
  const [setNewPassword] = useSetNewResetPasswordMutation();
  const [validateOtp] = useValidateOtpMutation();
  const [sendOtp] = useSendForgotPasswordCodeMutation();

  const [step, setStep] = useState(1);
  const [countdownRunning, setCountdownRunning] = useState(false);

  const otp = useRef<string>('');
  const resetToken = useRef<string>('');
  const countDownRef = useRef<CountdownTimerRef>(null);

  useRouteEffect<AuthStackParamList, 'ForgotPassword'>(params => {
    if (params?.step) {
      setStep(params.step);
    }
  });

  const {
    handleSubmit: handleStep1Submit,
    control: step1Control,
    getValues: step1Values,
  } = useForm({
    resolver: zodResolver(Step1Schema),
    defaultValues: {
      email: 'test@gmail.com',
    },
  });

  const {handleSubmit: handleStep3Submit, control: step3Control} = useForm({
    resolver: zodResolver(Step3Schema),
  });

  const onRequestReset = async ({email}: Step1SchemaType) => {
    const data = await sendOtp({email}).unwrap();
    successToast({text1: 'OTP sent to your email'});
    console.log(countDownRef.current);
    countDownRef.current?.restart(data.sendForgotPasswordCode.retry_after);
    setStep(2);
  };

  const onVerifyOtp = async () => {
    const email = step1Values().email;
    if (otp.current.length < 6) {
      errorToast({text1: 'Invalid OTP, Please enter all 6 digits'});
      return;
    }

    const data = await validateOtp({input: {email, otp: otp.current}}).unwrap();
    resetToken.current = data.validateOtp.token;
    successToast({text1: 'OTP verified successfully'});
    setStep(3);
  };

  const onSetNewPassword = async ({password}: Step3SchemaType) => {
    await setNewPassword({input: {token: resetToken.current, password}}).unwrap();
    successToast({text1: 'Password has been reset'});
    navigate('AuthStack', {screen: 'LoginAndSignup', params: {mode: 'login'}});
  };

  return ( 
    <TopImageLayout lottie={require('@assets/lottie/forgot.json')} >
      <StepsAnimation className='mt-4' step={step}>
        {
          <>
            <Text className="text-2xl font-bold mb-2">Enter Email</Text>
            <Text className="text-base mb-5 text-greyish-100">Enter your email address below to receive a password OTP.</Text>
            <FormInput control={step1Control} className="h-12 px-3 mb-2" placeholder="Email Address" keyboardType="email-address" name="email" />
            <Button icon="email-outline" label="Reset Password" onPress={handleStep1Submit(onRequestReset)} className="mt-4"></Button>
          </>
        }

        {
          <>
            <Text className="text-2xl font-bold mb-4">Enter OTP</Text>
            <Text className="text-base text-greyish-100">We have sent an OTP to your email. Please enter it below to verify.</Text>
            <SplitInput inputClassName="text-xl w-14" onSplitChange={data => (otp.current = data)} className="mt-5 flex justify-center" count={6} />
            <View className="mt-5 gap-3">
              <Button icon='refresh' className="flex-grow" disabled={countdownRunning} label="Resend OTP ?" position="right" onPress={handleStep1Submit(onRequestReset)}>
                <CountdownTimer onChange={setCountdownRunning} textClassName="text-white" ref={countDownRef} />
              </Button>
              <Button icon='shield-check-outline' className="flex-grow" label="Verify OTP" onPress={onVerifyOtp} />
              <Text className="mt-2 text-theme font-interBold text-center" onPress={() => setStep(1)}>Entered wrong email ? </Text>
            </View>
          </>
        }

        {
          <>
            <Text className="text-2xl font-bold mb-4">Set New Password</Text>
            <Text className="text-base mb-2 text-greyish-100">Enter your new password below to reset your account password.</Text>
            <FormInput control={step3Control} name="password" className="mb-5" placeholder="New Password" />
            <FormInput control={step3Control} name="confirmPassword" placeholder="Confirm Password" />
            <Button icon='check-circle-outline' label="Set New Password" className="mt-4" onPress={handleStep3Submit(onSetNewPassword)} />
          </>
        }
      </StepsAnimation>
    </TopImageLayout>
  );
};

export default ForgotPasswordScreen;
