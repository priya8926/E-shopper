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
    Update_Password_REQUEST,
    Update_Password_SUCCESS,
    Update_Password_RESET,
    Update_Password_FAILURE,
    Forgot_Password_REQUEST,
    Forgot_Password_SUCCESS,
    Forgot_Password_FAILURE,
    Reset_Password_REQUEST,
    Reset_Password_SUCCESS,
    Reset_Password_FAILURE,
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

export const profileReducer = (state = {}, action) => {
    switch (action.type) {
        case Update_Profile_REQUEST:
        case Update_Password_REQUEST:
            return {
                ...state,
                loading: false,
            }
        case Update_Profile_SUCCESS:
        case Update_Password_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload,
            };
        case Update_Profile_RESET:
        case Update_Password_RESET:
            return {
                ...state,
                isUpdated: false
            }

        case Update_Profile_FAILURE:
        case Update_Password_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,

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
//forgot password
export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case Forgot_Password_REQUEST:
        case Reset_Password_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }
        case Forgot_Password_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload,
            };
        case Reset_Password_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload,
            };
        case Forgot_Password_FAILURE:
        case Reset_Password_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,

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