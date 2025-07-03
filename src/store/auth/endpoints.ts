import { api } from "@/graphql/generated";

export const authApi = api.enhanceEndpoints({
    addTagTypes: ['auth'],
    endpoints: {
        User: {
            extraOptions: {
                skipToast: true,
            },
        },
    },
});

export const { useUserQuery, useLazyUserQuery, useLoginWithEmailMutation, useLoginWithGoogleMutation, useSendForgotPasswordCodeMutation, useSetNewResetPasswordMutation, useRefreshTokenMutation, useSignupMutation, useValidateOtpMutation } = authApi;
