import { store } from '@store/store';
import { authApi } from '@/store/auth/endpoints';
import { logout, setAccessToken } from '@store/auth/auth.slice';
import { errorToast } from '@components/Toast/Toast.config';
import { Mutex } from 'async-mutex';

const mutex = new Mutex();

export const refreshTokenAction = async () => {
    const release = await mutex.acquire();
    try {
        const state = store.getState();
        const refresh_token = state.auth.refresh_token;

        if (!refresh_token) {
            store.dispatch(logout());
            return null;
        }

        // Call the mutation
        const result = await store
            .dispatch(authApi.endpoints.RefreshToken.initiate({ token: refresh_token }))
            .unwrap();

        const newAccessToken = result.refreshToken?.access_token;

        if (!newAccessToken) {
            store.dispatch(logout());
            errorToast({ text1: 'Failed to refresh token' });
            return null;
        }

        store.dispatch(setAccessToken(newAccessToken));
        return newAccessToken;
    } catch (err: any) {
        store.dispatch(logout());
        errorToast({ text1: err.message || 'Failed to refresh token' });
        return null;
    } finally {
        release();
    }
};

export const waitForMutex = () => mutex.waitForUnlock();
export const isMutexLocked = () => mutex.isLocked();
