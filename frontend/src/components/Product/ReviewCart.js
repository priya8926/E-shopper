import React from 'react'
import profilepng from "../../img/user.png"
import { Rating } from '@mui/material'

function ReviewCart({ review }) {
    const options = {
        value: review.rating,
        readOnly: true,
        precision : 0.5
    };
    return (
        <>
            <div className=" reviewCart mx-3">
                <div className=" text-center">
                    <h5 className=""><img src={profilepng} alt='user' /></h5>
                    <h6 className=" mb-2 text-body-secondary">  <p>{review.name}</p></h6>
                    <p className=" d-flex justify-content-center">
                        <Rating {...options} />
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
