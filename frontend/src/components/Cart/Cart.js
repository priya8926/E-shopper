import React from 'react'
import './Cart.css'
import CartItems from './CartItems'
import { useSelector } from "react-redux"
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link } from 'react-router-dom';

function Cart() {
    const { cartItems } = useSelector(state => state.cart);

    return (
        <>{
            cartItems.length == 0 ?
                <div className='container emptyCart'>
                    <RemoveShoppingCartIcon />
                    <h4>No items in the cart</h4>
                    <Link to="/Products">View Products</Link>

                </div> : (
                    <>
                        <div className="cartPage">
                            <div className="cartHeader">
                                <p>Product</p>
                                <p>Quantity</p>
                                <p>Subtotal</p>
                            </div>
                            {cartItems && cartItems.map((item) => (
                                <div className="cartContainer">
                                    <CartItems item={item} />
                                </div>
                            ))}
                        </div>
                        <div className="totalPrice">
                            <div></div>
                            <div className="cartTotalPrice">
                                <p>Total</p>
                                <p>{`₹${600}`}</p>
                            </div>
                            <div></div>
                            <div className="checkout">
                                <button>Check Out</button>
                            </div>
                        </div>

                    </>
                )
        }
        </>
    )
}

export default Cart
