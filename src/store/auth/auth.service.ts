import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useValidateOtpMutation, useLoginWithGoogleMutation, useSendForgotPasswordCodeMutation, useSetNewResetPasswordMutation, useLoginWithEmailMutation, useSignupMutation } from '@/graphql/generated';
import { successToast } from '@components/Toast/Toast.config';
import { navigate } from '@/hooks/useNavigation.hook';
import { loginType, signUpType } from '@/types/auth';
import { useStorage } from '@/hooks/useStorage.hook';


const goWithGoogle = async () => {
    try {

        await GoogleSignin.hasPlayServices(); // Android only
        const userInfo = await GoogleSignin.signIn();
        const idToken = userInfo.data?.idToken; // The server auth code

        return idToken as Required<string>

    } catch (error) {
        throw error;
    }
}


export async function handleEmailLogin(formValues: loginType) {
    const [login] = useLoginWithEmailMutation()
    await login({ input: formValues }).unwrap();
    navigate('mainstack', { screen: 'home' });
}

export async function handleSignup(formValues: signUpType) {
    const [signup] = useSignupMutation()
    await signup({ input: formValues }).unwrap();
    successToast({ text1: 'Signup successful!' });
}

export async function handleGoogleLogin() {
    const idToken = await goWithGoogle();
    const [googleMutation] = useLoginWithGoogleMutation();
    await googleMutation({ idToken }).unwrap();
    successToast({ text1: 'Login with Google Successful' });
    navigate('mainstack', { screen: 'home' });
}


export const handleRequestPasswordReset = async (email: string) => {
    const [sendOtp] = useSendForgotPasswordCodeMutation()
    await sendOtp({ email }).unwrap();
    successToast({ text1: 'OTP sent to your email' });
};


export const handleSetNewPassword = async (password: string, token: string) => {
    const [setNewPassword] = useSetNewResetPasswordMutation()
    await setNewPassword({ password, token }).unwrap();
    successToast({ text1: 'Password has been reset' });
};

export const handleValidateOtp = async (email: string, otp: string) => {
    const [validateOtp] = useValidateOtpMutation()
    const result = await validateOtp({ email, otp }).unwrap();
    successToast({ text1: 'OTP verified successfully' });
    return result.token;
};