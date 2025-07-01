import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { errorToast } from '@components/Toast/Toast.config';


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


