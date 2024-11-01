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

    // check if user is logged in
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
    
    // blog
    const [selectedContent, setSelectedContent] = useState('blogs')

    return <AppContext.Provider value={{
        userData, // Auth, 
        setUserData, // LogOutBtn
        selectedContent, // Blog, BlogPageSelectOptions
        setSelectedContent, // BlogPageSelectOptions
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => useContext(AppContext)