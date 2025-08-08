import React from 'react';
import {View} from 'react-native';
import useNetwork from './useNetwork.hook';
import NetworkBanner from './NetworkBanner';
import NetworkScreen from './NetworkScreen';


const NetworkListener = () => {
  const {isOnline, showBanner, statusText, iconName, hideBanner} = useNetwork();

  return (
    <View>
      {/* Top banner for connection changes */}
      <NetworkBanner isVisible={showBanner} isOnline={isOnline} statusText={statusText} iconName={iconName} onClose={hideBanner} />

      {/* Persistent status indicator - top right corner */}
      <View
        style={{
          position: 'absolute',
          top: 60, // Below status bar
          right: 15,
          zIndex: 8888,
          elevation: 8888,
        }}>
        <NetworkScreen size="small" />
      </View>
    </View>
  );
};

export default NetworkListener;
