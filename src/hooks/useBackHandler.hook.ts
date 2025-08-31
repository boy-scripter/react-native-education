import { useEffect } from 'react';
import { BackHandler } from 'react-native';

/**
 * Hook to intercept hardware back button press on Android
 * @param action function to run when back button is pressed
 *               Should return true to prevent default behavior,
 *               false to allow default back action.
 */
export function useBackHandler(action: () => boolean) {
    useEffect(() => {
        const onBackPress = () => {
            return action(); // use user's return value: true = block, false = allow
        };

        const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackPress);

        return () => {
            backHandler.remove();
        };
    }, [action]);
}
