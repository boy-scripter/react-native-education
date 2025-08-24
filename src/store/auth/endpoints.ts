import { api } from '@/graphql/generated';

export const authApi = api.enhanceEndpoints({
    addTagTypes: ['auth'],
    endpoints: {
        Profile: {
            extraOptions: {
                skipToast: true,
            },
        },
        RefreshToken: {
            extraOptions: {
                skipToast: true
            }
        }
    },
});


export const { useProfileUpdateMutation, useProfileQuery, useLazyProfileQuery, useRefreshTokenMutation , useLoginWithEmailMutation, useLoginWithGoogleMutation, useSendForgotPasswordCodeMutation, useSetNewResetPasswordMutation, useSignupMutation, useValidateOtpMutation } = authApi;

