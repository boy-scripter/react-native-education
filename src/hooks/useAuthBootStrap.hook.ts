import { useEffect } from 'react';
import { useStorage } from './useStorage.hook';
import { resetRoot } from './useNavigation.hook';
import { useAppDispatch } from '@/store/store';
import { setAuthState } from '@/store/auth/auth.slice';

const { getItem } = useStorage()
export function useAuthBootstrap() {
    const dispatch = useAppDispatch()


    useEffect(() => {
        const checkToken = async () => {
            const remember_me = await getItem('REMEMBER_ME'); // or SecureStore

            if (remember_me) {
                resetRoot('DashboardStack', { screen: 'Home' });
                dispatch(setAuthState(remember_me))
            } else {
                resetRoot('AuthStack', { screen: 'LoginAndSignup' })
            }
        };

        checkToken();
    }, []);
}
