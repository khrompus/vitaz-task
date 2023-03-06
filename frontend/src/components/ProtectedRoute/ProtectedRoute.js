import React, {Component} from 'react'
import {Navigate} from 'react-router-dom';

//Защита роутов с перенаправлением в авторизацию
const ProtectedRoute = ({ isLoggedIn, children }) => {
    if (!isLoggedIn) {
        return <Navigate to="/sign-in" replace />;
    }

    return children;
};
export default ProtectedRoute