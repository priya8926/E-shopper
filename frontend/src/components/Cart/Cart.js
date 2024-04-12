import React from 'react'
import './Cart.css'
import CartItems from './CartItems'
import { useSelector } from "react-redux"
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import { Link, useNavigate } from 'react-router-dom';
import Metadata from '../Layout/Metadata';

function Cart() {
    const { cartItems } = useSelector(state => state.cart);
    const navigate = useNavigate()
    const checkoutHandler = () => {
        // navigate("/login?redirect=shipping")
        navigate("/shipping")
    }

    return (
        <>
            {
                cartItems.length == 0 ?
                    <div className='container emptyCart'>
                        <RemoveShoppingCartIcon />
                        <h4>No items in the cart</h4>
                        <Link to="/Products">View Products</Link>

                    </div> : (
                        <>
                            <Metadata title="Cart -- EShopper" />
                            <div className="cartPage">
                                <div className="cartHeader">
                                    <p>Product</p>
                                    <p>Quantity</p>
                                    <p>Subtotal</p>
                                </div>
                                {cartItems && cartItems.map((item) => (
                                    <div className="cartContainer" key={item.product}>
                                        <CartItems item={item} />
                                    </div>
                                ))}
                            </div>
                            <div className="totalPrice">
                                <div></div>
                                <div className="cartTotalPrice">
                                    <p>Total</p>
                                    <p>{`₹${cartItems.reduce(
                                        (acc, item) => acc + item.price * item.quantity,
                                        0
                                    )}`}</p>
                                </div>
                                <div></div>
                                <div className="checkout">
                                    <button onClick={checkoutHandler}>Check Out</button>
                                </div>
                            </div>

                        </>
                    )
            }

        </>
    )
}

export default Cart
