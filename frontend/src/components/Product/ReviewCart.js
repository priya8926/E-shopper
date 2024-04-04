import React from 'react'
import ReactStars from "react-rating-stars-component"
import profilepng from "../../img/user.png"

function ReviewCart({ review }) {
    const options = {
        edit: false,
        color: "grey",
        activeColor: "#ffc107 ",
        value: review.rating,
        isHalf: true
    };
    return (
        <>
            <div className=" reviewCart mx-3">
                <div className=" text-center">
                    <h5 className=""><img src={profilepng} alt='user' /></h5>
                    <h6 className=" mb-2 text-body-secondary">  <p>{review.name}</p></h6>
                    <p className=" d-flex justify-content-center">
                        <ReactStars {...options} />
                       
                    </p>
                    <p className="">
                        <span>{review.comment}</span>
                    </p>
                </div>
            </div>

        </>
    )
}

export default ReviewCart
