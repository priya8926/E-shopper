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
            header: {
                'Content-Type': 'application/json'
            }
        }
        const { data } = await axios.post('/api/v1/login',
            { email, password },
            config)

        dispatch({
            type: Login_SUCCESS,
            payload: data
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
            type : Register_User_SUCCESS,
            payload : data.user
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
            type:  Load_User_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: Load_User_FAILURE,
            payload: error.response.data.message
        })
    }
}
export const clearErros = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}