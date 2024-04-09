// import React from 'react'
// import { useSelector } from 'react-redux';
// import { Route, Navigate } from "react-router-dom"

// function ProtectedRoute({ element: Element, ...rest }) {
//     const { isAuthenticated, loading } = useSelector((state) => state.user);

//     if (loading) {
//         // You might want to add a loading indicator here
//         return null;
//     }

//     return (
//         <Route
//             {...rest}
//             element={(props) =>
//                 isAuthenticated ? <Element {...props} /> : <Navigate to="/login" replace />
//             }
//         />
//     );
// }

// export default ProtectedRoute

import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state.user);
    const location = useLocation();

    if (!user.isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default ProtectedRoute;
