import React, { useState } from 'react'

function Category() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    return (
        <>
            <div className="col-lg-3 d-none d-lg-block" style={{ position: 'relative' }}>
                <a
                    className="btn shadow-none d-flex align-items-center justify-content-between bg-primary text-white w-100"
                    data-toggle="collapse"
                    href="#navbar-vertical"
                    onClick={toggleDropdown}
                    style={{ height: 65, marginTop: "-1px", padding: "0 30px" }}
                >
                    <h6 className="m-0">Categories</h6>
                    <i className={`fa ${isOpen ? 'fa-angle-up' : 'fa-angle-down'} text-dark`} />
                </a>
                {isOpen && (
                <nav
                    className="collapse position-absolute navbar navbar-vertical navbar-light align-items-start p-0 border border-top-0 border-bottom-0 bg-light"
                    id="navbar-vertical"
                    style={{
                            position: 'absolute',
                            top: 'calc(100% - 1px)', // Adjusted to position right below the button
                            left: 0,
                            zIndex: 1000,
                            backgroundColor: 'white',
                            width: '95%',
                            height : '410px',
                            marginTop: '1px', // Added to prevent gap between button and dropdown
                            borderTop: '1px solid #dee2e6', // Added to maintain border consistency
                        }}
                >
                    <div className="navbar-nav w-100 overflow-hidden" style={{ maxHeight: 'calc(100vh - 65px)', overflowY: 'auto' }}>
                        <div className="nav-item dropdown">
                            <a href="#" className="nav-link" data-toggle="dropdown">
                                Dresses <i className="fa fa-angle-down float-right mt-1" />
                            </a>
                            <div className="dropdown-menu position-absolute bg-secondary border-0 rounded-0 w-100 m-0">
                                <a href="" className="dropdown-item">
                                    Men's Dresses
                                </a>
                                <a href="" className="dropdown-item">
                                    Women's Dresses
                                </a>
                                <a href="" className="dropdown-item">
                                    Baby's Dresses
                                </a>
                            </div>
                        </div>
                        <a href="" className="nav-item nav-link">
                            Shirts
                        </a>
                        <a href="" className="nav-item nav-link">
                            Jeans
                        </a>
                        <a href="" className="nav-item nav-link">
                            Swimwear
                        </a>
                        <a href="" className="nav-item nav-link">
                            Sleepwear
                        </a>
                        <a href="" className="nav-item nav-link">
                            Sportswear
                        </a>
                        <a href="" className="nav-item nav-link">
                            Jumpsuits
                        </a>
                        <a href="" className="nav-item nav-link">
                            Blazers
                        </a>
                        <a href="" className="nav-item nav-link">
                            Jackets
                        </a>
                        <a href="" className="nav-item nav-link">
                            Shoes
                        </a>
                    </div>
                </nav>
                )}
            </div>

        </>
    )
}

export default Category
