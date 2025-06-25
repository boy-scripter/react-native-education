// components/CustomToast.tsx
import React from 'react';
import {View, Text} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const colors = {
  success: '#22c55e', // green-500
  error: '#ef4444', // red-500
  info: '#3b82f6', // blue-500
  warning: '#facc15', // yellow-500
};

const icons = {
  success: 'check-circle-outline',
  error: 'close-circle-outline',
  info: 'information-outline',
  warning: 'alert-outline',
};

type ToastProps = {
  text1?: string;
  type: keyof typeof colors;
};

export const CustomToast = ({text1, type}: ToastProps) => {
  const iconColor = colors[type] || colors.info;
  const iconName = icons[type] || icons.info;

  return (
    <View style={{borderColor: iconColor}} className="flex-row gap-3 items-center bg-white rounded-xl px-4 py-3 mx-4 shadow-lg border-2 border-gray-100 space-x-3">
      <MaterialCommunityIcons name={iconName} size={20} color={iconColor} />
      <Text className="text-sm font-medium flex-1"> {text1} </Text>
    </View>
  );
};
