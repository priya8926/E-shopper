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
    ORDER_DETAILS_FAILURE,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_REQUEST,
    ALL_ORDER_FAILURE,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAILURE,
    DELETE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_FAILURE,
    CLEAR_ERRORS,
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

// get all orders -- admin
export const getAdminOrders = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_ORDER_REQUEST
        })

        const { data } = await axios.get(`/api/v1/admin/allorders`)
        dispatch({
            type: ALL_ORDER_SUCCESS,
            payload: data.orders
        })
    } catch (error) {
        dispatch({
            type: ALL_ORDER_FAILURE,
            payload: error.response.data.message,
        })
    }
}
// update order -- admin
export const updateOrder = (id , order)=> async(dispatch) =>{
    try {
        dispatch({
            type: UPDATE_ORDER_REQUEST
        })
        const config = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        const {data} = await axios.put(`/api/v1/admin/updateorder/${id}`, order,config )
        
        dispatch({
            type:UPDATE_ORDER_SUCCESS,
            payload: data.success
        }); 
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAILURE,
            payload: error.response.data.message,
        })
    }
}
// delete order -- admin
export const deleteOrder = (id)=> async(dispatch) =>{
    try {
        dispatch({
            type: DELETE_ORDER_REQUEST
        })
        const {data} = await axios.delete(`/api/v1/admin/deleteorder/${id}`)
        
        dispatch({
            type:DELETE_ORDER_SUCCESS,
            payload: data.success
        }); 
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAILURE,
            payload: error.response.data.message,
        })
    }
}
export const clearErros = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}