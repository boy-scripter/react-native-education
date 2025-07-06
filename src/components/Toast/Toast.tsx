// components/CustomToast.tsx
import React from 'react';
import {View, Text} from 'react-native';
import {BlurView} from '@react-native-community/blur';
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
    <View className="mx-4">
 <BlurView
          blurType="light"
          blurAmount={10}
          className='w-full h-10'
          style={{
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 12,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: iconColor,
            borderWidth: 1,
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            overflow: 'hidden',
          }}
        >
          <MaterialCommunityIcons name={iconName} size={22} color={iconColor} style={{ marginRight: 12 }} />
          <Text style={{ fontSize: 14, fontWeight: '500', flex: 1 }}>{text1}</Text>
        </BlurView>
    </View>
  );
};
