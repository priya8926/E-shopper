import React, { useEffect } from 'react'
import Carousel from "react-material-ui-carousel"
import './ProducuDetails.css'
import { useSelector, useDispatch } from "react-redux"
import { clearErros, getProductDetails } from '../../actions/productActions'
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component"
import ReviewCart from './ReviewCart'
import Loading from '../Layout/Loader/Loading'
import { useAlert } from "react-alert"
import Metadata from '../Layout/Metadata'

function ProductDetails() {
    const dispatch = useDispatch()
    const { id } = useParams();
    const alert = useAlert()
    const { product, error, loading } = useSelector(state => state.productDetails);
   
    const options = {
        edit: false,
        color: "grey",
        activeColor: "#ffc107 ",
        value: product.ratings,
        isHalf: true
    };
    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErros())
        }
        if (id) {
            dispatch(getProductDetails(id));
        }
    }, [dispatch, id , error , alert])

    return (
        <>
            {loading ? <Loading /> : (
                <>
                <Metadata title={`${product.name} -- EShopper`}/>
                <div className="row justify-content-center  productDetails mt-5 ProductDetails">
                    <div className="col-4 align-items-center  imgDiv">
                        <Carousel>
                            {product.images && product.images.map((item, i) => (
                                <img
                                    className='prodImg'
                                    key={item.url}
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            ))}
                        </Carousel>
                    </div>
                    <div className='col-4 '>
                        <div className='block1'>
                            <h5>{product.name}</h5>
                            <p>Product #{product._id}</p>
                        </div>
                        <div className="block2">
                            <ReactStars {...options} />
                            <span>({product.numOfReviews}  reviews)</span>
                        </div>
                        <div className="block3">
                            <h2>{`₹${product.price}`}</h2>
                            <div className="block3-1">
                                <div className="block3-1-1">
                                    <button>-</button>
                                    <input type="number" value="1" className='m-1 border-0'/>
                                    <button>+</button>
                                </div>
                                <button className='card text-center'>Add to cart</button>
                            </div>
                            <p className='textcolor'>
                                Status : {" "}
                                <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                                    {product.stock < 1 ? "OutOfStock" : " InStock"}</b>
                            </p>
                        </div>
                        <div className="block4">
                            Description : <p>{product.description}</p>
                        </div>
                        <button className='submitReview'>Submit Review</button>
                    </div>
                </div>
                <h5 className='reviewHeading'>REVIEWS</h5>
                {product.reviews && product.reviews[0] ? (
                    <div className='reviews d-flex overflow-auto container px-3'>
                        {product.reviews.map((review) => (
                            <ReviewCart review={review} />
                        ))}
                    </div>
                ) :
                    <p className='noReview'>No reviews yet</p>}
            </>)}
        </>
    )
}

export default ProductDetails;
