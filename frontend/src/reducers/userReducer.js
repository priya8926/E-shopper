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
            case Logout_user_SUCCESS:{
                return {
                    loading : false,
                    user : null ,
                    isAuthenticated : false
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
        case Logout_user_FAILURE :{
            return {
                ...state,
                loading : false,
                error : action.payload,

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