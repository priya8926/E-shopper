import {ADD_TO_CART , REMOVE_CART_ITEM} from '../constants/cartConstant'

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload

            const  existItem = state.cartItems.find((i) => i.product === item.product);
            
            if(existItem){
                return{
                    ...state,
                    cartItems : state.cartItems.map((i)=>
                    i.product === existItem.product ? item : i
                )
                }
            }else{
              return{
                ...state,
                cartItems : [...state.cartItems,item]
              }
           }
           case  REMOVE_CART_ITEM:
               return{
                   ...state,
                   cartItems: state.cartItems.filter((x)=> x.product!==action.payload)
               }
        default:
            return state;
    }
}
