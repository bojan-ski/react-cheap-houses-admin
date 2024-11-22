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
    const itemsAppUsersPage = 4;
    const { allUsersList, fetchAllUsers, curUsersPage, isLoading: isAllUsersLoading } = useFetchAllAppUsersData(itemsAppUsersPage);

    // search feature - state
    const [userSearchTerm, setUserSearchTerm] = useState('')
    const [userDisableSearch, setUserDisableSearch] = useState(false)
    
    // SELECTED USER PAGE
    const [selectedUserID, setSelectedUserID] = useState('')

    const itemsSelectedUserPage = 3;
    const { listings: allSelectedUserListings, fetchListings: fetchAllSelectedUserListings, page: curSelectedUserPage, isLoading: isAllSelectedUserListingsLoading } = useFetchSelectedUserListings(itemsSelectedUserPage);

    // AGENCIES PAGE
    const [selectedAgencyData, setSelectedAgencyData] = useState({})

    // PENDING LISTINGS PAGE
    const itemsPerPendingListingsPage = 3;
    const { listings: allPendingListings, fetchListings: fetchAllPendingListings, page: curPendingListingsPage, isLoading: isPendingListingsLoading } = useFetchAllListingsData(itemsPerPendingListingsPage, 'pending');

    // ACTIVE LISTINGS PAGE
    const itemsPerActiveListingsPage = 3;
    const { listings: allActiveListings, fetchListings: fetchAllActiveListings, page: curActiveListingsPage, isLoading: isActiveListingsLoading } = useFetchAllListingsData(itemsPerActiveListingsPage, 'active');

    // search and filter option
    const [adminSelectQueryOption, setAdminSelectQueryOption] = useState('search')
    const [userQueryParameter, setUserQueryParameter] = useState()
    const [disableOption, setDisableOption] = useState(false)

    // BLOG PAGE
    // blog options
    const [selectedContent, setSelectedContent] = useState('blogs')
    const [blogsDisableSearch, setBlogsDisableSearch] = useState(false)

    // search feature - state
    const [blogSearchTerm, setBlogSearchTerm] = useState('')

    // blog list
    const itemsPerPage = 3;
    const { blogPosts, fetchBlogPosts, curBlogPage, isLoading: isBlogsPageLoading } = useFetchBlogPageData(itemsPerPage)

    return <AppContext.Provider value={{
        userData, // Auth, Login
        setUserData, // LogOutBtn

        // USERS and AGENCIES PAGE
        allUsersList, // Users
        fetchAllUsers, // Users
        curUsersPage, // Users
        isAllUsersLoading, // Users

        userSearchTerm, // Users
        setUserSearchTerm, // Users
        userDisableSearch, // Users
        setUserDisableSearch, // Users

        // SELECTED USER PAGE
        selectedUserID, // SelectedUser
        setSelectedUserID, // SelectedUser
        allSelectedUserListings, // SelectedUser, AgenciesContainer, SelectedAgencyListings
        fetchAllSelectedUserListings, // SelectedUser, SelectAgencyOptions, SelectedAgencyListings, DeleteSelectedAgencyBtn, ApproveListingBtn
        curSelectedUserPage, // SelectedUser, SelectedAgencyListings
        isAllSelectedUserListingsLoading, // SelectedUser, isAllSelectedUserListingsLoading

        selectedAgencyData, // AgenciesContainer, SelectAgencyOptions, SelectedAgencyProfileData, SelectedAgencyListings, SelectedAgencyModal, DeleteSelectedAgencyBtn, ApproveListingBtn, DeleteListingBtn
        setSelectedAgencyData, // AgenciesContainer, SelectAgencyOptions, SelectedAgencyModal, DeleteSelectedAgencyBtn, ApproveListingBtn, DeleteListingBtn

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
        adminSelectQueryOption, // SelectQueryOption
        setAdminSelectQueryOption, // SelectQueryOption
        userQueryParameter, // AllActiveListings, ListingsSearchOption, ListingsFilterOptions, FilterOptions
        setUserQueryParameter, // SelectQueryOption, ListingsSearchOption, FilterOptions
        disableOption, // ListingsSearchOption, ListingsFilterOptions, FilterOptions
        setDisableOption, // SelectQueryOption, ListingsSearchOption, ListingsFilterOptions

        // BLOG PAGE
        selectedContent, // Blog, BlogPageSelectOptions
        setSelectedContent, // BlogPageSelectOptions

        blogSearchTerm, // BlogPostsList
        setBlogSearchTerm, // BlogPostsList
        blogsDisableSearch, // BlogPostsList
        setBlogsDisableSearch, // BlogPostsList

        blogPosts, // BlogPostsList
        fetchBlogPosts, // BlogPostsList, NewBlogPostForm, DeleteBlogPost
        curBlogPage, // BlogPostsList
        isBlogsPageLoading, // BlogPostsList
    }}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () => useContext(AppContext)