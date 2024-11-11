import { createContext, useContext, useEffect, useState } from "react";
// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
// api
import useFetchAllAppUsersData from "./hooks/useFetchAllAppUsersData";
import useFetchAllListingsData from "./hooks/useFetchAllListingsData";
import useFetchBlogPageData from "./hooks/useFetchBlogPageData";


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

    // USERS PAGE
    const itemsAppUsersPage = 2;
    const { allUsersList, fetchAllUsers, curUsersPage } = useFetchAllAppUsersData(itemsAppUsersPage);

    // PENDING LISTINGS PAGE
    const itemsPerPendingListingsPage = 9;
    const { listings: allPendingListings, fetchListings: fetchAllPendingListings, page: curPendingListingsPage } = useFetchAllListingsData(itemsPerPendingListingsPage, 'pending');

    // ACTIVE LISTINGS PAGE
    const itemsPerActiveListingsPage = 9;
    const { listings: allActiveListings, fetchListings: fetchAllActiveListings, page: curActiveListingsPage } = useFetchAllListingsData(itemsPerActiveListingsPage, 'active');

    // search and filter option
    const [userQueryParameter, setUserQueryParameter] = useState() 
    const [disableOption, setDisableOption] = useState(false)

    // BLOG PAGE
    // blog options
    const [selectedContent, setSelectedContent] = useState('blogs')

    // blog list
    const itemsPerPage = 12;
    const { blogPosts, fetchBlogPosts, curBlogPage } = useFetchBlogPageData(itemsPerPage)

    return <AppContext.Provider value={{
        userData, // Auth, Login
        setUserData, // LogOutBtn

        // USERS PAGE
        allUsersList, // Users
        fetchAllUsers, // Users
        curUsersPage, // Users

        // PENDING LISTINGS PAGE
        allPendingListings, // AllPendingListings
        fetchAllPendingListings, // AllPendingListings, ApproveListingBtn, DeleteListingBtn
        curPendingListingsPage, // AllPendingListings

        // ACTIVE LISTINGS PAGE
        allActiveListings, // AllActiveListings
        fetchAllActiveListings, // AllActiveListings, ApproveListingBtn, DeleteListingBtn, SelectQueryOption, ListingsSearchOption, ListingsFilterOptions, 
        curActiveListingsPage, // AllActiveListings
        userQueryParameter, // AllActiveListings, ListingsSearchOption, ListingsFilterOptions, FilterOptions
        setUserQueryParameter, // SelectQueryOption, ListingsSearchOption, FilterOptions
        disableOption, // ListingsSearchOption, ListingsFilterOptions, FilterOptions
        setDisableOption, // SelectQueryOption, ListingsSearchOption, ListingsFilterOptions

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