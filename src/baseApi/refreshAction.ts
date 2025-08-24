import { store } from '@store/store';
import { logout, setAccessToken } from '@store/auth/auth.slice';
import { errorToast } from '@components/Toast/Toast.config';
import { Mutex } from 'async-mutex';
import { API_URL } from '@env';
import { RefreshTokenDocument } from '@/graphql/generated';

const mutex = new Mutex();

export const refreshTokenAction = async (): Promise<string | null> => {
    const release = await mutex.acquire();

    try {
        const refresh_token = store.getState().auth.refresh_token;
        if (!refresh_token) {
            store.dispatch(logout());
            return null;
        }

        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                query: RefreshTokenDocument,
                variables: { token: refresh_token },
            }),
        });

        const result = await response.json();
        const newAccessToken = result?.data?.refreshToken?.access_token;

        if (!newAccessToken) {
            store.dispatch(logout());
            errorToast({ text1: 'Logging Out' });
            return null;
        }

        store.dispatch(setAccessToken(newAccessToken));
        return newAccessToken;

    } catch (err: any) {
        store.dispatch(logout());
        errorToast({ text1: err.message || 'Logging Out' });
        return null;
    } finally {
        release();
    }
};

export const waitForMutex = () => mutex.waitForUnlock();
export const isMutexLocked = () => mutex.isLocked();
