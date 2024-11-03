import { createContext, useContext, useEffect, useState } from "react";
// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";


const AppContext = createContext()

export const AppProvider = ({ children }) => {
    // user details
    const [userData, setUserData] = useState({
        isLoggedIn: false,
        userID: '',
        userEmail: '',
    })

    // check if user is logged in
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                auth.currentUser ? (
                    setUserData({
                        isLoggedIn: true,
                        userID: user.uid,
                        userEmail: user.email,
                    })
                ) : (
                    setUserData({
                        isLoggedIn: false,
                        userID: '',
                        userEmail: '',
                    })
                )
            }
        })
    }, [])
    
    // blog
    const [selectedContent, setSelectedContent] = useState('blogs')

    return <AppContext.Provider value={{
        userData, // Auth, Login
        setUserData, // LogOutBtn
        selectedContent, // Blog, BlogPageSelectOptions
        setSelectedContent, // BlogPageSelectOptions
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => useContext(AppContext)