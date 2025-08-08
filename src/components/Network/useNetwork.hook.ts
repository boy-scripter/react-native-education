import { useState, useEffect } from 'react';
import NetInfo from '@react-native-community/netinfo';

const useNetwork = () => {
    const [isOnline, setIsOnline] = useState(true);
    const [connectionType, setConnectionType] = useState('unknown');
    const [showBanner, setShowBanner] = useState(false);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            const connected = state.isConnected && state.isInternetReachable;
            setIsOnline(!!connected);
            setConnectionType(state.type || 'unknown');

            // Show banner when offline or just reconnected
            if (!connected) {
                setShowBanner(true);
            } else if (!isOnline && connected) {
                setShowBanner(true);
                setTimeout(() => setShowBanner(false), 2500);
            }
        });

        return () => unsubscribe();
    }, [isOnline]);

    const hideBanner = () => setShowBanner(false);

    const getStatusText = () => {
        return isOnline ? `✓ Connected (${connectionType})` : '⚠ No Internet';
    };

    const getIconName = () => {
        if (!isOnline) return 'wifi-off';
        return connectionType === 'cellular' ? 'signal-cellular-4-bar' : 'wifi';
    };

    return {
        isOnline,
        connectionType,
        showBanner,
        hideBanner,
        statusText: getStatusText(),
        iconName: getIconName(),
    };
};

export default useNetwork;