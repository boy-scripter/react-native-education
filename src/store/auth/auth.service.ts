import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { errorToast } from '@components/Toast/Toast.config';
import { AuthenticatedUser, AuthState, REMEMBER_ME } from '@/types/auth';
import { useStorage } from '@/hooks/useStorage.hook';

const { removeItem, setItem, getItem } = useStorage()

export async function goWithGoogle() {
    let idToken

    await GoogleSignin.hasPlayServices(); // Android only
    const userInfo = await GoogleSignin.signIn();
    idToken = userInfo.data?.idToken; // The server auth code

    if (!idToken) {
        errorToast({ text1: 'Unable To Proceed With Google Account' })
        throw new Error('Unable To Proceed With Google Account')
    }

    return idToken

}



export function setDataLocally(newData: AuthState) {
    const oldData = getItem<AuthenticatedUser>(REMEMBER_ME);
    setItem(REMEMBER_ME, { ...oldData, ...newData });
}