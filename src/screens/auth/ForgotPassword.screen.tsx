import {AuthStackParamList} from '@/types/navigation/authstack/authstack.interface';
import {useRouteEffect} from '@/hooks/useNavigation.hook';
import TopImageLayout from '@components/layouts/TopImage.Layout';
import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import SplitInput from '@components/ui/SplitInput';
import React, {useState} from 'react';
import {Text, Alert} from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);

  useRouteEffect<AuthStackParamList, 'ForgotPassword'>(params => {
    if (params?.step) {
      setStep(step);
    }
  });

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    // Add password reset logic here
    Alert.alert('Success', 'Password reset link has been sent to your email.');
  };

  return (
    <TopImageLayout image={'@assets/images/forgot.png'} title="Forgot Password" description="Reset your password to regain access to your account">
      {step == 1 && (
        <>
          <Text className="text-2xl font-bold mb-5">Forgot Password</Text>
          <Text className="text-base mb-5 text-greyish-100">Enter your email address below to receive a password reset link.</Text>
          <Input className="h-12 px-3 mb-5" placeholder="Email Address" keyboardType="email-address" value={email} onChange={text => setEmail(text)} />
          <Button label="Reset Password" onPress={handleResetPassword}></Button>
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
          <Input className="mb-5" placeholder="New Password" />
          <Input placeholder="Confirm Password" />
          <Button label="Reset Password" className="mt-4" onPress={() => Alert.alert('Success', 'Password has been reset successfully.')}></Button>
        </>
      )}
    </TopImageLayout>
  );
};

export default ForgotPasswordScreen;
