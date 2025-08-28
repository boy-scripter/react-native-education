import React from 'react';
import {View, Text, TouchableOpacity, Platform, StatusBar} from 'react-native';
import {MotiView} from 'moti';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface NetworkBannerProps {
  isVisible: boolean;
  isOnline: boolean;
  statusText: string;
  iconName: string;
  onClose: () => void;
}

const NetworkBanner: React.FC<NetworkBannerProps> = ({isVisible, isOnline, statusText, iconName, onClose}) => {
  if (!isVisible) return null;

  const getStatusBarHeight = (): number => (Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 24);

  const backgroundColor = isOnline ? '#22c55e' : '#ef4444'; // green-500 or red-500
  const borderColor = isOnline ? '#15803d' : '#b91c1c'; // green-700 or red-700

  return (
    <MotiView
      from={{translateY: -60, opacity: 0}}
      animate={{translateY: 0, opacity: 1}}
      exit={{translateY: -60, opacity: 0}}
      transition={{type: 'timing', duration: 300}}
      style={{
        position: 'absolute',
        top: getStatusBarHeight(),
        left: 0,
        right: 0,
        backgroundColor: backgroundColor,
        borderBottomWidth: 2,
        borderBottomColor: borderColor,
        zIndex: 9999,
        elevation: 9999,
      }}>
        <Text>test</Text>
      <View className="flex-row items-center justify-between px-4 py-3">
        <View className="flex-row items-center flex-1">
          <Icon name={iconName} size={18} color="white" style={{marginRight: 8}} />
          <Text className="text-white text-sm font-medium" style={{color: 'white'}}>
            {statusText}
          </Text>
        </View>

        {!isOnline && (
          <TouchableOpacity onPress={onClose} className="p-1">
            <Icon name="close" size={16} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </MotiView>
  );
};

export default NetworkBanner;
