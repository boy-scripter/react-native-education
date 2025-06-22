// components/CustomToast.tsx
import React from 'react';
import { View, Text } from 'react-native';

const dotColors = {
  success: 'bg-green-500',
  error: 'bg-red-500',
  info: 'bg-blue-500',
  warning: 'bg-yellow-500',
};

type ToastProps = {
  text1?: string;
  text2?: string;
  type: keyof typeof dotColors;
};





export const CustomToast = ({ text1, text2, type }: ToastProps) => {
  const dotColor = dotColors[type] || 'bg-gray-500';

  return (
    <View className="flex-row items-center bg-white rounded-xl px-4 py-3 mx-4 shadow-md space-x-3">
      <View className={`w-2.5 h-2.5 rounded-full ${dotColor}`} />
      <View className="flex-1">
        {text1 ? <Text className="text-base font-semibold text-black">{text1}</Text> : null}
        {text2 ? <Text className="text-sm text-gray-600 mt-0.5">{text2}</Text> : null}
      </View>
    </View>
  );
};
