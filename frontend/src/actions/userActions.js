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
    Update_Profile_FAILURE,
    Update_Password_REQUEST,
    Update_Password_SUCCESS,
    Update_Password_FAILURE,
    Forgot_Password_REQUEST,
    Forgot_Password_SUCCESS,
    Forgot_Password_FAILURE,
    Reset_Password_REQUEST,
    Reset_Password_SUCCESS,
    Reset_Password_FAILURE,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAILURE,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAILURE,
    Update_USER_REQUEST,
    Update_USER_SUCCESS,
    Update_USER_RESET,
    Update_USER_FAILURE,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_RESET,
    DELETE_USER_FAILURE,
    CLEAR_ERRORS
} from '../constants/userConstant'
import axios from "axios"

// login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: Login_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/login',
            { email, password },
            config)

        dispatch({
            type: Login_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: Login_FAILURE,
            payload: error.response.data.message
        })
    }
}
// register
export const register = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: Register_User_REQUEST
        })

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.post("/api/v1/register", userData, config);

        dispatch({
            type: Register_User_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: Register_User_FAILURE,
            payload: error.response.data.message
        })
    }
}
// load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: Load_user_REQUEST
        })
        const { data } = await axios.get('/api/v1/me')

        dispatch({
            type: Load_User_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: Load_User_FAILURE,
            payload: error.response.data.message
        })
    }
}
// logout user
export const logoutUser = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`)
        dispatch({
            type: Logout_user_SUCCESS,
        })
    } catch (error) {
        dispatch({
            type: Logout_user_FAILURE,
            payload: error.response.data.message
        })
    }
}
// update user profile
export const upateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: Update_Profile_REQUEST
        })

        const config = { headers: { "Content-Type": "multipart/form-data" } };

        const { data } = await axios.put("/api/v1/me/update", userData, config);

        dispatch({
            type: Update_Profile_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: Update_Profile_FAILURE,
            payload: error.response.data.message
        })
    }
}
// change password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({
            type: Update_Password_REQUEST
        })

        const config = { headers: { "Content-Type": "application/json" } };

        const { data } = await axios.put("/api/v1/password/update", passwords, config);

        dispatch({
            type: Update_Password_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: Update_Password_FAILURE,
            payload: error.response.data.message
        })
    }
}
// forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({
            type: Forgot_Password_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/password/forgot', email, config)

        dispatch({
            type: Forgot_Password_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: Forgot_Password_FAILURE,
            payload: error.response.data.message
        })
    }
}
// reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({
            type: Reset_Password_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)

        dispatch({
            type: Reset_Password_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: Reset_Password_FAILURE,
            payload: error.response.data.message
        })
    }
}
export const getAllUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_USERS_REQUEST
        })
        const { data } = await axios.get(`/api/v1/admin/users`)
        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data.users
        })
    } catch (error) {
        dispatch({
            type: ALL_USERS_FAILURE,
            payload: error.response.data.message
        })
    }
}
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })
        const { data } = await axios.get(`/api/v1/admin/getSingleuser/${id}`)
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.user
        })
    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAILURE,
            payload: error.response.data.message
        })
    }
}
export const updateUserDetails = (id, userData) => async (dispatch) => {
    try {
        dispatch({
            type: Update_USER_REQUEST
        })
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.put(`/api/v1/admin/user/updaterole/${id}`, userData, config)
        dispatch({
            type: Update_USER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: Update_USER_FAILURE,
            payload: error.response.data.message
        })
    }
}
export const deteteUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_USER_REQUEST
        })
        const { data } = await axios.delete(`/api/v1/admin/user/delete/${id}`)
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAILURE,
            payload: error.response.data.message
        })
    }
}
export const clearErros = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}