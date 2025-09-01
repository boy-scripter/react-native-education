import React from 'react';
import {Text} from 'react-native';
import {useNetInfo} from '@react-native-community/netinfo';
import {MotiView} from 'moti';
import {OfflineIcon} from '@components/Icons'; // make sure these are exported

export function NetworkListener() {
  const {isConnected} = useNetInfo();

  return (
    <MotiView
      // overlay takes full screen
      pointerEvents={isConnected ? 'none' : 'auto'}
      from={{opacity: 0}}
      animate={{opacity: isConnected ? 0 : 1}}
      transition={{
        type: 'timing',
        duration: 400,
        delay: isConnected ? 0 : 500, // wait 500ms before showing disconnect
      }}
      className="absolute top-0 left-0 right-0 bottom-0 justify-center items-center bg-gray-900/50 px-6">
      <MotiView
        from={{scale: 0.9, rotate: '-5deg'}}
        animate={{
          scale: isConnected ? 0.9 : 1,
          rotate: isConnected ? '-5deg' : '0deg',
        }}
        transition={{
          type: 'spring',
          damping: 14,
          stiffness: 180,
          delay: isConnected ? 0 : 500, // sync with outer fade
        }}
        className="bg-white rounded-2xl p-8 items-center min-w-[280px] shadow-2xl border border-white/20">
        {/* Icon */}
        <MotiView
          from={{rotate: '0deg', scale: 1}}
          animate={{
            rotate: isConnected ? '180deg' : '0deg',
            scale: isConnected ? 0.8 : 1,
          }}
          transition={{
            type: 'spring',
            damping: 14,
            stiffness: 180,
            delay: isConnected ? 0 : 500,
          }}
          className="mb-6 p-4 border-2 rounded-full">
          <OfflineIcon color="#EF4444" size={40} />
        </MotiView>

        {/* Text */}
        <Text className="text-xl font-bold text-black mb-2">Network Status</Text>
        <Text className="text-lg font-semibold text-red-600">Internet Disconnected</Text>
      </MotiView>
    </MotiView>
  );
}
