import {
    ALL_PRODUCTS_REQUEST,
    ALL_PRODUCTS_SUCCESS,
    ALL_PRODUCTS_FAILURE,
    PRODUCTS_DETAILS_REQUEST,
    PRODUCTS_DETAILS_SUCCESS,
    PRODUCTS_DETAILS_FAILURE,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_RESET,
    NEW_REVIEW_FAILURE,
    ADMIN_PRODUCTS_REQUEST,
    ADMIN_PRODUCTS_SUCCESS,
    ADMIN_PRODUCTS_FAILURE,
    CLEAR_ERRORS
} from "../constants/productConstant"

export const productReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case ALL_PRODUCTS_REQUEST:
        case ADMIN_PRODUCTS_REQUEST:
            return {
                loading: true,
                products: [],
            };

        case ALL_PRODUCTS_SUCCESS:
            return {
                loading: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filterProductByCount: action.payload.filterProductByCount
            };

        case ADMIN_PRODUCTS_SUCCESS:
            return {
                loading: false,
                payload: action.payload
            }
            
        case ALL_PRODUCTS_FAILURE:
        case ADMIN_PRODUCTS_FAILURE:
            return {
                loading: false,
                error: action.payload
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
export const productDetailsReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCTS_DETAILS_REQUEST:
            return {
                loading: true,
                ...state
            };
        case PRODUCTS_DETAILS_SUCCESS:
            return {
                loading: false,
                product: action.payload
            };
        case PRODUCTS_DETAILS_FAILURE:
            return {
                loading: false,
                error: action.payload
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

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case NEW_REVIEW_REQUEST:
            return {
                loading: true,
                ...state
            };
        case NEW_REVIEW_SUCCESS:
            return {
                loading: false,
                success: action.payload
            };
        case NEW_REVIEW_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        case NEW_REVIEW_RESET:
            return {
                ...state,
                loading: false,
                error: action.payload
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