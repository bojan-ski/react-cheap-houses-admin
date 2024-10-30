import { createContext, useContext, useEffect, useState } from "react";
// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";


const AppContext = createContext()

export const AppProvider = ({ children }) => {
    // user details
    const [userData, setUserData] = useState({
        userID: '',
        userEmail: '',
    })

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                auth.currentUser ? (
                    setUserData({
                        userID: user.uid,
                        userEmail: user.email,
                    })
                ) : (
                    setUserData({
                        userID: '',
                        userEmail: '',
                    })
                )
            }
        })
    }, [])

    return <AppContext.Provider value={{
        userData, // Auth, NewBlogPostForm
        setUserData, // LogOutBtn
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => useContext(AppContext)