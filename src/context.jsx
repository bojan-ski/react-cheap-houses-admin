import { createContext, useContext, useEffect, useState } from "react";
// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
// api
import useFetchBlogPageData from "./hooks/useFetchBlogPageData";
import useFetchAllListingsData from "./hooks/useFetchAllListingsData";


const AppContext = createContext()

export const AppProvider = ({ children }) => {
    // ADMIN USER DATA
    const [userData, setUserData] = useState({
        isLoggedIn: false,
        userID: '',
        userEmail: '',
    })

    // check if user is logged
    useEffect(() => {
        console.log('context - onAuthStateChanged');

        onAuthStateChanged(auth, async (user) => {
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

    // PENDING LISTINGS PAGE
    const itemsPerPendingListingsPage = 9;
    const { listings: allPendingListings, fetchListings: fetchAllPendingListings, page: curPendingListingsPage } = useFetchAllListingsData(itemsPerPendingListingsPage, 'pending');

    // ACTIVE LISTINGS PAGE
    const itemsPerActiveListingsPage = 9;
    const { listings: allActiveListings, fetchListings: fetchAllActiveListings, page: curActiveListingsPage } = useFetchAllListingsData(itemsPerActiveListingsPage, 'active');

    // BLOG PAGE
    // blog options
    const [selectedContent, setSelectedContent] = useState('blogs')

    // blog list
    const itemsPerPage = 12;
    const { blogPosts, fetchBlogPosts, curBlogPage } = useFetchBlogPageData(itemsPerPage)

    return <AppContext.Provider value={{
        userData, // Auth, Login
        setUserData, // LogOutBtn

        // PENDING LISTINGS PAGE
        allPendingListings, // AllPendingListings
        fetchAllPendingListings, // AllPendingListings
        curPendingListingsPage, // AllPendingListings

        // ACTIVE LISTINGS PAGE
        allActiveListings, // AllActiveListings
        fetchAllActiveListings, // AllActiveListings
        curActiveListingsPage, // AllActiveListings

        // BLOG PAGE
        selectedContent, // Blog, BlogPageSelectOptions
        setSelectedContent, // BlogPageSelectOptions
        blogPosts, // BlogPostsList
        fetchBlogPosts, // BlogPostsList, NewBlogPostForm
        curBlogPage // BlogPostsList
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => useContext(AppContext)