import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useValidateOtpMutation, useLoginWithGoogleMutation, useSendForgotPasswordCodeMutation, useSetNewResetPasswordMutation, useLoginWithEmailMutation, useSignupMutation } from '@/graphql/generated';
import { errorToast, successToast } from '@components/Toast/Toast.config';
import { navigate } from '@/hooks/useNavigation.hook';
import { loginType, signUpType } from '@/types/auth';

export async function handleEmailLogin(formValues: loginType) {
    const [login] = useLoginWithEmailMutation()
    await login({ input: formValues }).unwrap();
    navigate('DashboardStack', { screen: 'Home' });
}

export async function handleSignup(formValues: signUpType) {
    const [signup] = useSignupMutation()
    await signup({ input: formValues }).unwrap();
    successToast({ text1: 'Signup successful!' });
}

export async function handleGoogleLogin() {
    let idToken

    await GoogleSignin.hasPlayServices(); // Android only
    const userInfo = await GoogleSignin.signIn();
    idToken = userInfo.data?.idToken; // The server auth code

    if (!idToken) {
        errorToast({ text1: 'Unable To Proceed With Google Account' })
        throw new Error('Unable To Proceed With Google Account')
    }

    const [googleMutation] = useLoginWithGoogleMutation();
    await googleMutation({ idToken }).unwrap();
    successToast({ text1: 'Login with Google Successful' });
    navigate('DashboardStack', { screen: 'Home' });

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