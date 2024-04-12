import React from 'react'
import './CartItem.css'
import { Link } from "react-router-dom"
import { useAlert } from "react-alert"
import { useDispatch, useSelector } from "react-redux"
import { addItemsToCart, removeItemFromCart } from '../../actions/cartActions'

function CartItems({ item }) {
  const dispatch = useDispatch()
  const alert = useAlert()
  const { cartItems } = useSelector(state => state.cart);

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1
    if (stock <= quantity) return
    dispatch(addItemsToCart(id, newQty))
  }
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1
    if (1 == quantity) return
    dispatch(addItemsToCart(id, newQty))
  }
  const deleteCartItem = (id) => {
    dispatch(removeItemFromCart(id))
    alert.success("Product remove from the cart")
  }
  return (
    <>
            <div className="">
              <div className="row mt-4 ">
                <div className="col-sm-8 d-flex px-5 ">
                  <img src={item.image} alt="product image" style={{ height: "100px" }} />
                  <div className='px-5 d-flex flex-column '>
                    <Link to={`/Product/${item.product}`}>
                      {item.name}
                    </Link>
                    <span>{`Price ₹${item.price}`}</span>
                    <p style={{ color: "#D19C97", cursor: "pointer" }} onClick={() => deleteCartItem(item.product)}>
                      <i className="fas fa-xmark" ></i>X remove</p>
                  </div>
                </div>
                <div className="d-flex align-items-center justify-content-space-between" style={{ width: "31%" }} >
                  <div className='col-sm'>
                    <div className="input-group quantity mr-3" style={{ width: 130 , marginLeft:"-21px"}}>
                      <div className="input-group-btn">
                        <button className="btn btn-primary btn-minus" onClick={() => decreaseQuantity(item.product, item.quantity)} >
                          <i className="fa fa-minus" />
                        </button>
                      </div>
                      <input
                        type="text"
                        className="form-control bg-secondary text-center"
                        readOnly
                        value={item.quantity}

                      />
                      <div className="input-group-btn">
                        <button className="btn btn-primary btn-plus" onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>
                          <i className="fa fa-plus" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className='col-sm d-flex justify-content-end'>
                    <div className="subTotal d-flex">
                      {`₹${item.price * item.quantity}`}
                    </div>
                  </div>
                </div>
              </div>
            </div>
    </>
  )
}

export default CartItems
