import React from 'react'
import { Link } from "react-router-dom"
import ReactStars from "react-rating-stars-component"

function Allproducts({ data }) {
    const getRatingOptions = (rating) => {
        return {
            edit: false,
            color: "grey",
            activeColor: "#ffc107 ",
            value: rating,
            isHalf: true
        };
    };

    return (
        <>
            <div className="col-lg-3 col-md-3 col-sm-4 pb-1">
                <div className="card product-item border-2 mb-4" style={{ height: "35vmax" }}>
                    <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0 ">
                        <div className='img-container  d-flex align-items-center justify-content-center' style={{height:"38vh"}}>
                            <img className="img-fluid" src={data.images[0].url} alt="" />
                        </div>
                    </div>
                    <div className="card-body border-left border-right text-center p-0 pt-3 pb-2">
                        <h6 className="text-truncate mb-3">{data.name}</h6>

                        <div className="d-flex justify-content-center">
                            <h6>{`₹${data.price}`}</h6>

                        </div>
                    </div>
                    <div className="card-footer d-flex justify-content-between bg-light border">
                        <Link to={`/product/${data._id}`} className="btn btn-sm text-dark p-0">
                            <i className="fas fa-eye text-primary mr-1" />
                            View Detail
                        </Link>
                        <Link className="btn btn-sm text-dark p-0">
                            <i className="fas fa-shopping-cart text-primary mr-1" />
                            Add To Cart
                        </Link>
                    </div>
                    <div className='card-footer d-flex justify-content-between bg-light border'>
                        <ReactStars {...getRatingOptions(data.ratings)} /><span>{data.numOfReviews}</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Allproducts
