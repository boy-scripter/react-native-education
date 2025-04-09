import { AuthActionType } from 'src/types/auth/auth.enum';
import { AuthState } from 'src/types/auth/auth.interface';

interface AuthAction {
    type: AuthActionType;
    payload?: any;
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case AuthActionType.LOGIN_SUCCESS:
        case AuthActionType.SIGNUP_SUCCESS:
            return { ...state, user: action.payload, loading: false, error: null };

        case AuthActionType.LOGOUT:
            return { ...state, user: null, loading: false, error: null, access_token: null };

        case AuthActionType.SET_LOADING:
            return { ...state, loading: action.payload };

        case AuthActionType.SET_ERROR:
            return { ...state, error: action.payload };

        default:
            return state;
    }
}

export default authReducer;
