import React, { useState } from 'react'
import Category from './Layout/Category'
import { useNavigate } from 'react-router-dom'

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
                    <a href="" className="text-decoration-none">
                        <h1 className="m-0 display-5 font-weight-semi-bold">
                            <span className="text-primary font-weight-bold border px-3 mr-1">
                                E
                            </span>
                            Shopper
                        </h1>
                    </a>
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
                                    <a className="dropdown-item" href="#">
                                        Latest
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Popularity
                                    </a>
                                    <a className="dropdown-item" href="#">
                                        Best Rating
                                    </a>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="col-lg-3 col-6 text-right">
                    <a href="" className="btn border">
                        <i className="fas fa-heart text-primary" />
                        <span className="badge">0</span>
                    </a>
                    <a href="" className="btn border">
                        <i className="fas fa-shopping-cart text-primary" />
                        <span className="badge">0</span>
                    </a>
                    <a href="" className="btn border">
                        <i className="fas fa-user text-primary"></i>
                    </a>
                </div>
            </div>

            {/* Navbar Start */}
            <div className="container-fluid mb-2">
                <div className="row border-top px-xl-5">
                    <Category />
                    <div className="col-lg-9" >
                        <nav className="navbar navbar-expand-lg bg-light navbar-light py-3 py-lg-0 px-0">
                            <a href="" className="text-decoration-none d-block d-lg-none">
                                <h1 className="m-0 display-5 font-weight-semi-bold">
                                    <span className="text-primary font-weight-bold border px-3 mr-1">
                                        E
                                    </span>
                                    Shopper
                                </h1>
                            </a>
                            <button
                                type="button"
                                className="navbar-toggler"
                                data-toggle="collapse"
                                data-target="#navbarCollapse"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                            <div
                                className="collapse navbar-collapse justify-content-between"
                                id="navbarCollapse"
                            >
                                <div className="navbar-nav mr-auto py-0">
                                    <a href="/" className="nav-item nav-link active">
                                        Home
                                    </a>
                                    <a href="/Products" className="nav-item nav-link">
                                        Products
                                    </a>
                                    <a href="detail.html" className="nav-item nav-link">
                                        Shop Detail
                                    </a>
                                    <div className="nav-item dropdown">
                                        <a
                                            href="#"
                                            className="nav-link dropdown-toggle"
                                            data-toggle="dropdown"
                                        >
                                            Pages
                                        </a>
                                        <div className="dropdown-menu rounded-0 m-0">
                                            <a href="cart.html" className="dropdown-item">
                                                Shopping Cart
                                            </a>
                                            <a href="checkout.html" className="dropdown-item">
                                                Checkout
                                            </a>
                                        </div>
                                    </div>
                                    <a href="contact.html" className="nav-item nav-link">
                                        Contact
                                    </a>
                                </div>
                                <div className="navbar-nav ml-auto py-0">
                                    <a href="" className="nav-item nav-link">
                                        Login
                                    </a>
                                    <a href="" className="nav-item nav-link">
                                        Register
                                    </a>
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
