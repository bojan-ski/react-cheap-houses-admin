import React from 'react'
import { Navigate, Outlet } from "react-router-dom"
// context
import { useGlobalContext } from "../context";


const PrivateRoute = () => {
    const { userData } = useGlobalContext()  

    return (userData?.isLoggedIn && userData?.userID == "qNMq7DiL6jMFRQZqWEctgnyYF163") ? <Outlet /> : <Navigate to='/' />
}

export default PrivateRoute