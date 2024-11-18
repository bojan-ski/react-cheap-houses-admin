import { Navigate, Outlet } from "react-router-dom"
// context
import { useGlobalContext } from "../context";


const PrivateRoute = ({ children }) => {
    const { userData } = useGlobalContext()
    // console.log(userData);    

    return (userData?.isLoggedIn && userData?.userID == "qNMq7DiL6jMFRQZqWEctgnyYF163") ? <Outlet /> : <Navigate to='/' />
    return (userData?.isLoggedIn && userData?.userID == "qNMq7DiL6jMFRQZqWEctgnyYF163") ? children : <Navigate to='/' />
}

export default PrivateRoute