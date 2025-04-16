import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import SplitInput from '@components/ui/SplitInput';
import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';
import {ImageBackground} from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const step: number = 3; //must be state
  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    // Add password reset logic here
    Alert.alert('Success', 'Password reset link has been sent to your email.');
  };

  return (
    <View className="flex-1 bg-theme">
      <ImageBackground className="h-60 flex gap-3 justify-end py-5 px-5 rounded-b-3xl" source={require('@assets/images/forgot.png')}>
        <Text className="font-interBold text-white text-3xl">Forgot Password</Text>
        <Text className="text-white font-inter text-sm">Reset your password to regain access to your account</Text>
      </ImageBackground>
      <View  className="flex-1 bg-white py-10 rounded-t-3xl overflow-hidden p-5">
        {step == 1 && (
          <>
            <Text className="text-2xl font-bold mb-5">Forgot Password</Text>
            <Text className="text-base  mb-5 text-greyish-100">Enter your email address below to receive a password reset link.</Text>
            <Input className="h-12  px-3 mb-5" placeholder="Email Address" keyboardType="email-address" value={email} onChange={setEmail} />
            <Button label="Reset Password" onPress={handleResetPassword}></Button>
          </>
        )}
        {step == 2 && (
          <>
            <Text className="text-2xl font-bold  mb-4">Enter OTP</Text>
            <Text className="text-base text-greyish-100">We have sent an OTP to your email. Please enter it below to verify.</Text>
            <SplitInput inputClassName="text-xl w-14" onSplitChange={otp => console.log(otp)} className="mt-5 flex justify-center" count={6}></SplitInput>
            <Button label="Verify OTP" className="mt-5" onPress={() => Alert.alert('Success', 'OTP verified successfully.')}></Button>
          </>
        )}
        {step == 3 && (
          <>
            <Text className="text-2xl font-bold mb-4">Set New Password</Text>
            <Text className="text-base mb-2 text-greyish-100">Enter your new password below to reset your account password.</Text>
            <Input className="mb-5" placeholder="New Password"  />
            <Input placeholder="Confirm Password"  />
            <Button label="Reset Password" className="mt-4" onPress={() => Alert.alert('Success', 'Password has been reset successfully.')}></Button></>
        )}
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
