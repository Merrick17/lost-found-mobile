import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    LOGOUT_REQUEST,
    LOGOUT_SUCCESS,
    LOGOUT_FAILURE,
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_SUCCESS,
    RESET_PASSWORD_FAILURE,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAILURE,
    UPDATE_USER_PROFILE
} from '../actions/actionTypes';

const initAuthState = {
    token: "",
    user: null,
    loading: false,
    error: null
};

const authReducer = (state = initAuthState, action: any) => {
    const { type, payload } = action;
    switch (type) {
        case LOGIN_REQUEST:
        case LOGOUT_REQUEST:
        case REGISTER_REQUEST:
        case RESET_PASSWORD_REQUEST:
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                token: payload.token,
                user: payload.user,
                error: null
            };
        case LOGOUT_SUCCESS:
            return {
                ...state,
                loading: false,
                token: "",
                user: null,
                error: null
            };
        case RESET_PASSWORD_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                user: payload.user,
                error: null
            };
        case LOGIN_FAILURE:
        case LOGOUT_FAILURE:
        case REGISTER_FAILURE:
        case RESET_PASSWORD_FAILURE:
        case UPDATE_PROFILE_FAILURE:
            return {
                ...state,
                loading: false,
                error: payload.error
            };
        case UPDATE_USER_PROFILE:
            return { ...state, user: payload }
        default:
            return state;
    }
};

export default authReducer;