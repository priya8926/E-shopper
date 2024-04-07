import React, { useState } from 'react'
import Category from './Layout/Category'
import { useNavigate, Link } from 'react-router-dom'
import LoginSignup from './User/LoginSignup'

function Navbar() {
    const [keyword, setKeyword] = useState("")

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
        }
        else {
            navigate(`/`)
        }
    }
    return (
        <>
            <div className="row align-items-center py-3 px-xl-5">
                <div className="col-lg-3 d-none d-lg-block">
                   <Link to="" className="text-decoration-none">
                        <h1 className="m-0 display-5 font-weight-semi-bold">
                            <span className="text-primary font-weight-bold border px-3 mr-1">
                                E
                            </span>
                            Shopper
                        </h1>
                   </Link>
                </div>
                <div className="col-lg-6 col-6 text-left">
                    <form onSubmit={handleSubmit}>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search for products"
                                onChange={(e) => setKeyword(e.target.value)}
                            />
                            <div className="input-group-append">
                                <input type="submit" value="search" className="input-group-text bg-transparent text-primary"/>
                            </div>
                            <div className="dropdown ml-4">
                                <button
                                    className="btn border dropdown-toggle"
                                    type="button"
                                    id="triggerId"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    Sort by
                                </button>
                                <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="triggerId"
                                >
                                    <Link className="dropdown-item" to="#">
                                        Latest
                                    </Link>
                                   <Link className="dropdown-item" to="#">
                                        Popularity
                                   </Link>
                                   <Link className="dropdown-item" to="#">
                                        Best Rating
                                   </Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-lg-3 col-6 text-right">
                   <Link to="" className="btn border">
                        <i className="fas fa-heart text-primary" />
                        <span className="badge">0</span>
                   </Link>
                   <Link to="" className="btn border">
                        <i className="fas fa-shopping-cart text-primary" />
                        <span className="badge">0</span>
                   </Link>
                   <Link to="/login" className="btn border">
                        <i className="fas fa-user text-primary"></i>
                   </Link>
                </div>
            </div>

            {/* Navbar Start */}
            <div className="container-fluid mb-2">
                <div className="row border-top px-xl-5">
                    <Category />
                    <div className="col-lg-9" >
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                           <Link to="/" className="text-decoration-none d-block d-lg-none">
                                <h1 className="m-0 display-5 font-weight-semi-bold">
                                    <span className="text-primary font-weight-bold border px-3 mr-1">
                                        E
                                    </span>
                                    Shopper
                                </h1>
                           </Link>
                            <button
                                type="button"
                                className="navbar-toggler"
                                data-toggle="collapse"
                                data-target="#navbarCollapse"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div
                                className="collapse navbar-collapse justify-content-between "
                                id="navbarCollapse"
                            >
                                <div className="navbar-nav mr-auto py-0">
                                   <Link to="/" className="nav-item nav-link active">
                                        Home
                                   </Link>
                                   <Link to="/Products" className="nav-item nav-link">
                                        Products
                                   </Link>
                                   <Link to="/shopdetail" className="nav-item nav-link">
                                        Shop Detail
                                   </Link>
                                    <div className="nav-item dropdown">
                                       <Link
                                            to="/pages"
                                            className="nav-link dropdown-toggle"
                                            data-toggle="dropdown"
                                        >
                                            Pages
                                       </Link>
                                        <div className="dropdown-menu rounded-0 m-0">
                                           <Link to="/shoppingcart" className="dropdown-item">
                                                Shopping Cart
                                           </Link>
                                           <Link to="/checkout" className="dropdown-item">
                                                Checkout
                                           </Link>
                                        </div>
                                    </div>
                                   <Link to="/contact" className="nav-item nav-link">
                                        Contact
                                   </Link>
                                </div>
                                <div className="navbar-nav ml-auto py-0">
                                   <Link to="/login" className="nav-item nav-link">
                                        Login
                                   </Link>
                                   <Link to="/register" className="nav-item nav-link">
                                        Register
                                   </Link>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </div>
            {/* Navbar End */}
        </>

    )
}

export default Navbar
