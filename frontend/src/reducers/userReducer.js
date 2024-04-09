import {
    Login_REQUEST,
    Login_SUCCESS,
    Login_FAILURE,
    Register_User_REQUEST,
    Register_User_SUCCESS,
    Register_User_FAILURE,
    Load_user_REQUEST,
    Load_User_SUCCESS,
    Load_User_FAILURE,
    Logout_user_SUCCESS,
    Logout_user_FAILURE,
    Update_Profile_REQUEST,
    Update_Profile_SUCCESS,
    Update_Profile_RESET,
    Update_Profile_FAILURE,
    CLEAR_ERRORS
} from '../constants/userConstant'

export const userReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case Login_REQUEST:
        case Register_User_REQUEST:
        case Load_user_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }
        case Login_SUCCESS:
        case Register_User_SUCCESS:
        case Load_User_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case Logout_user_SUCCESS: {
            return {
                loading: false,
                user: null,
                isAuthenticated: false
            }
        }
        case Login_FAILURE:
        case Register_User_FAILURE:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null,
            }
        case Load_User_FAILURE: {
            return {
                loading: false,
                isAuthenticated: false,
                error: action.payload,
                user: null,
            }
        }
        case Logout_user_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload,

            }
        }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}

export const profileReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case Update_Profile_REQUEST:
            return {
                ...state,
                loading: false,
            }
        case Update_Profile_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated:action.payload,
            };
        case Update_Profile_RESET: {
            return {
                ...state,
                isUpdated : false
            }
        }
        case Update_Profile_FAILURE: {
            return {
                ...state,
                loading: false,
                error: action.payload,

            }
        }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        default:
            return state;
    }
}