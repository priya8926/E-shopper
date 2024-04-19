import React, { useEffect, useState } from 'react'
import './Shop.css'
import Loading from '../Layout/Loader/Loading';
import { useAlert } from 'react-alert';
import { getProduct } from '../../actions/productActions'
import { useSelector, useDispatch } from "react-redux"
import Allproducts from './Allproducts';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Slider from "@mui/material/Slider";
import Typography from '@mui/material/Typography';
import Metadata from '../Layout/Metadata';


function Shop() {
  const categories = ["Footwear", "Jackets", "Blazers", "Jumpsuits", "Sportswear", "Kurti", "Swimwear", "Jeans", "Shirts", "Laptop", "Smartphone", "Bedsheets" , "Accerssories"]

  const { keyword } = useParams();
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 25000])
  const [category, setCategory] = useState("")
  const [ratings, setRatings] = useState(0)

  const { loading, error, products, productsCount, resultPerPage, filterProductByCount } = useSelector((state) => state.products);

  const alert = useAlert()

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }
  const handlePriceChange = (event, newprice) => {
    setPrice(newprice)
  }
  useEffect(() => {
    if (error) {
      alert.error(error)
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings))
  }, [dispatch, error, alert, keyword, currentPage, price, category, ratings])

  let count = filterProductByCount
  return (
    <>

      {loading ? <Loading /> : (
        <>
          <Metadata title="Products -- EShopper" />
          <div className="container-fluid pt-5">
            <div className="row px-xl-5">

              {/* Shop Sidebar Start */}
              <div className="col-lg-3 col-md-12">
                {/* Price Start */}
                <div className="border-bottom mb-4 pb-3">
                  <h5 className="font-weight-semi-bold mb-2">Filter by price</h5>
                  <div className="filterBox">
                    {/* <Typography>Price</Typography> */}
                    <Slider
                      value={price}
                      onChange={handlePriceChange}
                      valueLabelDisplay="auto"
                      aria-labelledby="price-slider"
                      min={0}
                      max={25000}
                      getAriaValueText={(value) => `$${value}`}
                    />
                  </div>
                </div>
                {/* Price End */}

                {/* category start */}
                <h5 className="font-weight-semi-bold mb-2">Filter by category</h5>
                <div className="border-bottom mb-4 pb-3 justify-content-center">
                  {/* <Typography>Categories</Typography> */}
                  {categories.map((category) => (
                    <>
                      <div className="categories d-flex justify-content-start align-items-center mb-1 "
                        key={category}
                        onClick={() => setCategory(category)}>
                        {category}

                      </div>
                    </>
                  ))}
                </div>
                {/* category end */}
                {/* rating */}
                <div className="border-bottom mb-4 pb-4">
                  <h5 className="font-weight-semi-bold mb-4">Filter by rating</h5>

                  <Typography component="legend">Rating Above</Typography>
                  <Slider
                    value={ratings}
                    onChange={(e, newRatings) => setRatings(newRatings)}
                    valueLabelDisplay="auto"
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={5}
                  />
                </div>
                {/* Color Start */}
                <div className="border-bottom mb-4 pb-4">
                  <h5 className="font-weight-semi-bold mb-4">Filter by color</h5>
                  <form>
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        defaultChecked=""
                        id="color-all"
                      />
                      <label className="custom-control-label" htmlFor="price-all">
                        All Color
                      </label>
                      <span className="badge border font-weight-normal">1000</span>
                    </div>
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="color-1"
                      />
                      <label className="custom-control-label" htmlFor="color-1">
                        Black
                      </label>
                      <span className="badge border font-weight-normal">150</span>
                    </div>
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="color-2"
                      />
                      <label className="custom-control-label" htmlFor="color-2">
                        White
                      </label>
                      <span className="badge border font-weight-normal">295</span>
                    </div>
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="color-3"
                      />
                      <label className="custom-control-label" htmlFor="color-3">
                        Red
                      </label>
                      <span className="badge border font-weight-normal">246</span>
                    </div>
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="color-4"
                      />
                      <label className="custom-control-label" htmlFor="color-4">
                        Blue
                      </label>
                      <span className="badge border font-weight-normal">145</span>
                    </div>
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="color-5"
                      />
                      <label className="custom-control-label" htmlFor="color-5">
                        Green
                      </label>
                      <span className="badge border font-weight-normal">168</span>
                    </div>
                  </form>
                </div>
                {/* Color End */}
                {/* Size Start */}
                <div className="mb-5">
                  <h5 className="font-weight-semi-bold mb-4">Filter by size</h5>
                  <form>
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        defaultChecked=""
                        id="size-all"
                      />
                      <label className="custom-control-label" htmlFor="size-all">
                        All Size
                      </label>
                      <span className="badge border font-weight-normal">1000</span>
                    </div>
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="size-1"
                      />
                      <label className="custom-control-label" htmlFor="size-1">
                        XS
                      </label>
                      <span className="badge border font-weight-normal">150</span>
                    </div>
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="size-2"
                      />
                      <label className="custom-control-label" htmlFor="size-2">
                        S
                      </label>
                      <span className="badge border font-weight-normal">295</span>
                    </div>
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="size-3"
                      />
                      <label className="custom-control-label" htmlFor="size-3">
                        M
                      </label>
                      <span className="badge border font-weight-normal">246</span>
                    </div>
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="size-4"
                      />
                      <label className="custom-control-label" htmlFor="size-4">
                        L
                      </label>
                      <span className="badge border font-weight-normal">145</span>
                    </div>
                    <div className="custom-control custom-checkbox d-flex align-items-center justify-content-between">
                      <input
                        type="checkbox"
                        className="custom-control-input"
                        id="size-5"
                      />
                      <label className="custom-control-label" htmlFor="size-5">
                        XL
                      </label>
                      <span className="badge border font-weight-normal">168</span>
                    </div>
                  </form>
                </div>
                {/* Size End */}
              </div>
              {/* Shop Sidebar End */}

              {/* Shop Product Start */}
              <div className="col-lg-9 col-md-12">
                <div className="row pb-3">
                  <div className="col-12 pb-1">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                    </div>
                  </div>
                  {products && products.map((data) => (
                    <Allproducts key={data._id} data={data} />
                  ))}

                  {/* Pagination */}
                  <div className="col-12 pb-1">
                    <nav aria-label="Page navigation">
                      <div className="paginationBox">
                        {resultPerPage < productsCount && (
                          <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={resultPerPage}
                            totalItemsCount={productsCount}
                            onChange={setCurrentPageNo}
                            nextPageText=">>"
                            prevPageText="<<"
                            firstPageText="1st"
                            lastPageText="Last"
                            itemClass='page-item'
                            linkClass='page-link'
                            activeClass='pageItemActive'
                            activeLinkClass='pageLinkActive'
                          />
                        )}
                      </div>
                    </nav>
                  </div>
                </div>
              </div>
              {/* Shop Product End */}
            </div>
          </div>
        </>
      )
      }
    </>

  )
}
export default Shop
