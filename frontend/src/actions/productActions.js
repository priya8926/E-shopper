import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAILURE,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAILURE, 
    CLEAR_ERRORS
} from "../constants/productConstant"
import axios from "axios"

export const getProduct = (keyword="" , currentPage =1) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_PRODUCTS_REQUEST,
        })
        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}`;
        const { data } = await axios.get(link)
        dispatch({
            type: ALL_PRODUCTS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ALL_PRODUCTS_FAILURE,
            payload: error.response.data.message,
        })
    }
}
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: PRODUCTS_DETAILS_REQUEST,
        })
        const { data } = await axios.get(`/api/v1/getproduct/${id}`)
        dispatch({
            type: PRODUCTS_DETAILS_SUCCESS,
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: PRODUCTS_DETAILS_FAILURE,
            payload: error.response.data.message,
        })
    }
}

export const clearErros = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}