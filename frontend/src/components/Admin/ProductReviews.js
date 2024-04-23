import React, { useEffect, useState } from 'react'
import './ProductReviews.css'
import { useNavigate, Link, useParams } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import Metadata from '../Layout/Metadata'
import { useAlert } from 'react-alert';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import Sidebar from './Sidebar'
import { Button } from '@material-ui/core'
import { DELETE_REVIEW_RESET } from '../../constants/productConstant'
import {clearErros, deleteReviews, getAllReviews } from '../../actions/productActions'
import StarIcon from '@mui/icons-material/Star';

function ProductReviews() {
  const { error, reviews, loading } = useSelector((state) => state.allReviews)
  const { error: deleteError, isDeleted } = useSelector(state => state.deleteReview)

  const dispatch = useDispatch()
  const alert = useAlert()
  const [productId, setProductId] = useState("")

  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReviews(reviewId , productId))
  }
  const columns = [
    { field: "id", headerName: "Review Id", minWidth: 200, flex: 0.5 },
    {
      field: "user", headerName: "User", minWidth: 150, flex: 0.3,
    },
    { field: "comment", headerName: "Comment", type: "number", minWidth: 350, flex: 0.7 },
    {
      field: "rating", headerName: "Rating", type: "number", minWidth: 270, flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "rating") >= 3 ? "greenColor" : "redColor"
      }
    },
    {
      field: "actions", headerName: "Actions", flex: 0.3, minWidth: 150, type: "number", sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Button onClick={() => deleteReviewHandler(params.getValue(params.id, "id"))}>
              <DeleteIcon />
            </Button>
          </>
        )
      }
    }
  ]
  const rows = []

  reviews && reviews.forEach((item, index) => {
    rows.push({
      id: item._id,
      user: item.name,
      comment: item.comment,
      rating: item.rating
    })
  })
  const ProductReviewSubmitHandler = (e) => {
    e.preventDefault()
    dispatch(getAllReviews(productId))
  }
  useEffect(() => {
    if(productId.length === 24){
      dispatch(getAllReviews(productId))
    }
    if (error) {
      alert.error(error)
      dispatch(clearErros())
    }
    if (deleteError) {
      alert.error(deleteError)
      dispatch(clearErros())
    }
    if (isDeleted) {
      alert.success("Review deleted successfully!")
      dispatch({ type: DELETE_REVIEW_RESET })
    }
  }, [dispatch, alert, error, deleteError, isDeleted , productId])
  return (
    <>
      <Metadata title={`All Reviews --admin`} />

      <div className="dashboard">
        <Sidebar />
        <div className="productReviewContainer">
          <form action=""
            className='productReviewsForm'
            encType='multipart/form-data'
            onSubmit={ProductReviewSubmitHandler}>
            <h1 className='productReviewsFormHeading'>All Reviews</h1>
            <div>
              <StarIcon />
              <input type="text" placeholder='Product Id' required value={productId}
                onChange={(e) => setProductId(e.target.value)} />
            </div>
            <Button id="createProductBtn" type="submit">
              Search
            </Button>
          </form>

          {reviews && reviews.length > 0 ?
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              disableSelectionOnClick
              className='productListTable'
              autoHeight
            /> :
            <h1 className='productReviewsFormHeading'>No Review Found</h1>
          }
        </div>
      </div>
    </>
  )
}
export default ProductReviews
