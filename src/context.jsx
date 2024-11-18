import { createContext, useContext, useEffect, useState } from "react";
// firebase
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase.config";
// api
import useFetchAllAppUsersData from "./hooks/useFetchAllAppUsersData";
import useFetchAllListingsData from "./hooks/useFetchAllListingsData";
import useFetchBlogPageData from "./hooks/useFetchBlogPageData";
import useFetchSelectedUserListings from "./hooks/useFetchSelectedUserListings";


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
    const { allUsersList, fetchAllUsers, curUsersPage, isLoading: isAllUsersLoading } = useFetchAllAppUsersData(itemsAppUsersPage);

    // SELECTED USER PAGE
    const [selectedUserID, setSelectedUserID] = useState('')    
    const itemsSelectedUserPage = 2;
    const { listings: allSelectedUserListings, fetchListings: fetchAllSelectedUserListings, page: curSelectedUserPage, isLoading: isAllSelectedUserListingsLoading } = useFetchSelectedUserListings(itemsSelectedUserPage);

    // AGENCIES PAGE
    const [selectedAgencyData, setSelectedAgencyData] = useState({})

    // PENDING LISTINGS PAGE
    const itemsPerPendingListingsPage = 2;
    const { listings: allPendingListings, fetchListings: fetchAllPendingListings, page: curPendingListingsPage, isLoading: isPendingListingsLoading } = useFetchAllListingsData(itemsPerPendingListingsPage, 'pending');

    // ACTIVE LISTINGS PAGE
    const itemsPerActiveListingsPage = 2;
    const { listings: allActiveListings, fetchListings: fetchAllActiveListings, page: curActiveListingsPage, isLoading: isActiveListingsLoading } = useFetchAllListingsData(itemsPerActiveListingsPage, 'active');

    // search and filter option
    const [userQueryParameter, setUserQueryParameter] = useState() 
    const [disableOption, setDisableOption] = useState(false)

    // BLOG PAGE
    // blog options
    const [selectedContent, setSelectedContent] = useState('blogs')

    // blog list
    const itemsPerPage = 3;
    const { blogPosts, fetchBlogPosts, curBlogPage, isLoading: isBlogsPageLoading } = useFetchBlogPageData(itemsPerPage)

    return <AppContext.Provider value={{
        userData, // Auth, Login
        setUserData, // LogOutBtn

        // USERS PAGE
        allUsersList, // Users
        fetchAllUsers, // Users
        curUsersPage, // Users
        isAllUsersLoading, // Users

        // SELECTED USER PAGE
        selectedUserID, // SelectedUser
        setSelectedUserID, // SelectedUser
        allSelectedUserListings, // SelectedUser, AgenciesContainer, SelectedAgencyListings
        fetchAllSelectedUserListings, // SelectedUser, SelectAgencyOptions, SelectedAgencyListings, DeleteSelectedAgencyBtn
        curSelectedUserPage, // SelectedUser, SelectedAgencyListings
        isAllSelectedUserListingsLoading, // SelectedUser, isAllSelectedUserListingsLoading

        selectedAgencyData, // AgenciesContainer, SelectAgencyOptions, SelectedAgencyProfileData, SelectedAgencyListings, SelectedAgencyModal, DeleteSelectedAgencyBtn
        setSelectedAgencyData, // AgenciesContainer, SelectAgencyOptions, SelectedAgencyModal, DeleteSelectedAgencyBtn

        // PENDING LISTINGS PAGE
        allPendingListings, // AllPendingListings
        fetchAllPendingListings, // AllPendingListings, ApproveListingBtn, DeleteListingBtn
        curPendingListingsPage, // AllPendingListings
        isPendingListingsLoading, // AllPendingListings

        // ACTIVE LISTINGS PAGE
        allActiveListings, // AllActiveListings
        fetchAllActiveListings, // AllActiveListings, ApproveListingBtn, DeleteListingBtn, SelectQueryOption, ListingsSearchOption, ListingsFilterOptions, 
        curActiveListingsPage, // AllActiveListings
        isActiveListingsLoading, // AllActiveListings
        userQueryParameter, // AllActiveListings, ListingsSearchOption, ListingsFilterOptions, FilterOptions
        setUserQueryParameter, // SelectQueryOption, ListingsSearchOption, FilterOptions
        disableOption, // ListingsSearchOption, ListingsFilterOptions, FilterOptions
        setDisableOption, // SelectQueryOption, ListingsSearchOption, ListingsFilterOptions

        // BLOG PAGE
        selectedContent, // Blog, BlogPageSelectOptions
        setSelectedContent, // BlogPageSelectOptions
        blogPosts, // BlogPostsList
        fetchBlogPosts, // BlogPostsList, NewBlogPostForm
        curBlogPage, // BlogPostsList
        isBlogsPageLoading, // BlogPostsList
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => useContext(AppContext)