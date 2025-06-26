import { GoogleSignin } from '@react-native-google-signin/google-signin';

interface GoogleResponse {
    code: string
    scope: string[]
}

await GoogleSignin.configure(); // Android only
export const goWithGoogle = async () => {
    try {
        
        await GoogleSignin.hasPlayServices(); // Android only
        const userInfo = await GoogleSignin.signIn();
        console.log(userInfo)
        const authCode = userInfo.data?.serverAuthCode; // The server auth code

        return {
            code: authCode,
            scope: userInfo.data?.scopes || ['profile', 'email'].toString(), // customize if needed
        } as GoogleResponse;

    } catch (error) {
        throw error;
    }
}