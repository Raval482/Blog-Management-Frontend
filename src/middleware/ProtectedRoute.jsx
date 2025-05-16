
import React from 'react'
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({role}) => {
    const token = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");
    const status = sessionStorage.getItem("status");

    if(!token) return <Navigate to="/" />
    if(status != "approved") return <Navigate to="/"/>
    if(role && role !== userRole) return <Navigate to="/not-authorized"/>

    return (
       <Outlet/>
    )
}

export default ProtectedRoute