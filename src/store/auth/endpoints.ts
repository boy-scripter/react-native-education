import { api } from '@/graphql/generated';

export const authApi = api.enhanceEndpoints({
    addTagTypes: ['auth'],
    endpoints: {
        Profile: {
            extraOptions: {
                skipToast: true,
            },
        },
    },
});

export const { useProfileUpdateMutation,useProfileQuery, useLazyProfileQuery, useLoginWithEmailMutation, useLoginWithGoogleMutation, useSendForgotPasswordCodeMutation, useSetNewResetPasswordMutation, useSignupMutation, useValidateOtpMutation } = authApi;

