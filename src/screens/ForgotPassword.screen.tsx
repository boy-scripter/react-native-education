import Button from '@components/ui/Button';
import Input from '@components/ui/Input';
import SplitInput from '@components/ui/SplitInput';
import React, {useState} from 'react';
import {View, Text, Alert} from 'react-native';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email address.');
      return;
    }
    // Add password reset logic here
    Alert.alert('Success', 'Password reset link has been sent to your email.');
  };

  return (
    <View className="flex-1 justify-center p-5 bg-white">
      <Text className="text-2xl font-bold text-center mb-5">Forgot Password</Text>
      <Text className="text-base text-center mb-5 text-greyish-100">Enter your email address below to receive a password reset link.</Text>
      <Input className="h-12 border border-gray-300 rounded-lg px-3 mb-5" placeholder="Email Address" type="text" value={email} onChange={setEmail} />
      <Button label="Reset Password" className="bg-blue-500 py-4 rounded-lg items-center"  onPress={handleResetPassword}></Button>
      <SplitInput count={5}></SplitInput>
    </View>

  );
};

export default ForgotPasswordScreen;



