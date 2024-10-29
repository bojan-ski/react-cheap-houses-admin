import { createContext, useContext, useState } from "react";


const AppContext = createContext()

export const AppProvider = ({ children }) => {
    // user details
    const [userData, setUserData] = useState({
        userID: '123',
        userName: 'Admin',
    })

    return <AppContext.Provider value={{
        userData, // Auth, NewBlogPostForm
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => useContext(AppContext)