import React from 'react'
// context
import { useGlobalContext } from "../../../context";
// firebase
import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.config";
// toastify
import { toast } from "react-toastify";


const LogOutBtn = () => {
    const { setUserData } = useGlobalContext()

    const logOutUser = async () => {
        if (window.confirm('Da li ste sigurni da želite da se odjavite')) {
            try {
                await signOut(auth)

                setUserData({
                    isLoggedIn: false,
                    userID: '',
                    userEmail: '',
                })

                // success message
                toast.success('Uspešno ste se odjavili');

                // redirect user
                setTimeout(() => window.location.href = '/', 1)
            } catch (error) {
                //error message
                toast.error('Greška prilikom odjave')
            }
        }
    }

    return (
        <button type="button" className="logout-btn btn btn-danger text-white" onClick={logOutUser}>
            Odjavi se
        </button>
    )
}

export default LogOutBtn