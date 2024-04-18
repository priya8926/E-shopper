import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAILURE,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAILURE,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAILURE,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAILURE,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_RESET,
    NEW_PRODUCT_FAILURE,
    CLEAR_ERRORS
} from "../constants/productConstant"
import axios from "axios"

export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0) =>
    async (dispatch) => {
        try {
            dispatch({
                type: ALL_PRODUCTS_REQUEST,
            })
            let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

            if (category) {
                link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
            }
            const { data } = await axios.get(link)
            console.log(link)

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

export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_REVIEW_REQUEST,
        })
        const config = {
            headers : {'Content-Type': 'application/json'}
        }
        const { data } = await axios.put(`/api/v1/review` , reviewData , config)
        dispatch({
            type: NEW_REVIEW_SUCCESS,
            payload: data.success,
        })
    } catch (error) {
        dispatch({
            type: NEW_REVIEW_FAILURE,
            payload: error.response.data.message,
        })
    }
}
// get all products --admin
export const getAdminProduct = () => async(dispatch) =>{
    try {
        dispatch({
            type : ADMIN_PRODUCTS_REQUEST,
        })
        const {data} = await axios.get(`/api/v1/admin/products`)
        dispatch({
            type : ADMIN_PRODUCTS_SUCCESS,
            payload : data.products
        })
    } catch (error) {
        dispatch({
            type: ADMIN_PRODUCTS_FAILURE,
            payload: error.response.data.message,
        })
    }
}
export const createNewProuct = (productData) =>async(dispatch) =>{
    try {
        dispatch({
            type : NEW_PRODUCT_REQUEST,
        })
        const config = {
            headers : {'Content-Type': 'application/json'}
        }
        const { data } = await axios.post(`/api/v1/admin/products/new` , productData , config)

        dispatch({
            type: NEW_PRODUCT_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: NEW_PRODUCT_FAILURE,
            payload: error.response.data.message,
        })
    }
}
export const clearErros = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}