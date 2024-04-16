import axios from "axios"
import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAILURE,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAILURE,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    CLEAR_ERRORS,
    ORDER_DETAILS_FAILURE,
} from "../constants/orderConstant"

// create order
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({
            type: CREATE_ORDER_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const { data } = await axios.post('/api/v1/order/new', order, config)

        dispatch({
            type: CREATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAILURE,
            payload: error.response.data.message,
        })
    }
}

// my orders
export const myOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: MY_ORDER_REQUEST
        })

        const { data } = await axios.get('/api/v1/myOrder')

        dispatch({
            type: MY_ORDER_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: MY_ORDER_FAILURE,
            payload: error.response.data.message,
        })
    }
}

// my order details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ORDER_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/order/${id}`)

        dispatch({
            type: ORDER_DETAILS_SUCCESS,
            payload: data.order
        })

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAILURE,
            payload: error.response.data.message,
        })
    }
}

export const clearErros = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}