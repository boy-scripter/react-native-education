import React from 'react';
import {MotiView} from 'moti';
import Icon from 'react-native-vector-icons/MaterialIcons';
import useNetwork from './useNetwork.hook';

type Size = 'small' | 'medium' | 'large';

const NetworkScreen = ({size = 'small'}: {size: Size}) => {
  const {isOnline, iconName} = useNetwork();

  const sizeMap: Record<Size, {icon: number; container: number}> = {
    small: {icon: 16, container: 24},
    medium: {icon: 20, container: 28},
    large: {icon: 24, container: 32},
  };

  const {icon: iconSize, container: containerSize} = sizeMap[size];

  return (
    <MotiView
      from={{scale: 1}}
      animate={{scale: !isOnline ? [1, 1.1, 1] : 1}}
      transition={{
        type: 'timing',
        duration: !isOnline ? 1500 : 200,
        loop: !isOnline,
      }}
      style={{
        width: containerSize,
        height: containerSize,
        borderRadius: containerSize / 2,
        backgroundColor: isOnline ? '#22c55e' : '#b91c1c',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: isOnline ? 1 : 0.7,
      }}>
      <Icon name={iconName} size={iconSize} color="white" />
    </MotiView>
  );
};

export default NetworkScreen;
