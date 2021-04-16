import { REGISTER_SUCESS, REGISTER_FAIL,USER_LOADED,AUTH_ERROR,LOGIN_FAIL,LOGIN_SUCESS, LOGOUT,ACCOUNT_DELETED } from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    user: null
}

export default function (state = initialState, action) {
    const {type ,payload} = action
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                user: payload,
                loading:false
            }
        case REGISTER_SUCESS:
        case LOGIN_SUCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                loading: false,
                isAuthenticated: true
            }
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
        case ACCOUNT_DELETED:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                loading: false,
                isAuthenticated: false
            }

        default:
            return state;
    }
}