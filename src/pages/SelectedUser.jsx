import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
// api
import fetchSelectedDataFromFirebase from '../api/fetchSelectedDataFromFirebase'
// context
import { useGlobalContext } from '../context'
// components
import BackButton from '../components/BackButton'
import ProfileDetails from '../components/selectedUserPage/ProfileDetails'
import NoDataAvailableMessage from '../components/NoDataAvailableMessage'
import AllListingsContainer from '../components/AllListingsContainer'
import PaginationUsers from '../components/PaginationUsers'


// LOADER
export const loader = async ({ params }) => {
    const selectedUserAccountData = await fetchSelectedDataFromFirebase('users', params.id, 'korisnika')

    return selectedUserAccountData
}

const SelectedUser = () => {
    const params = useParams()
    const { selectedUserID, setSelectedUserID, allSelectedUserListings, fetchAllSelectedUserListings, curSelectedUserPage } = useGlobalContext()

    // Fetch the first page on mount
    useEffect(() => {
        console.log('SelectedUser - useEffect');       

        if(selectedUserID != params.id || allSelectedUserListings.length == 0){          
            fetchAllSelectedUserListings(0, params.id);
            setSelectedUserID(params.id)
        }
    }, [])

    return (
        <div className='selected-user-page mt-5'>
            <div className="container">

                <div className='mb-3'>
                    <BackButton />
                </div>

                <section className='selected-user-account-details bg-white p-4 rounded-5 mb-3'>
                    <ProfileDetails />
                </section>

                <section className='selected-user-listings bg-white p-4 rounded-5 mb-5'>
                    {!allSelectedUserListings || allSelectedUserListings == 0 ? (
                        <NoDataAvailableMessage text='oglasa' />
                    ) : (
                        <>
                            <h2 className="fw-bold text-center mb-4">
                                Svi oglasi korisnika
                            </h2>

                            <AllListingsContainer listingsList={allSelectedUserListings} />

                            <PaginationUsers fetchData={fetchAllSelectedUserListings} userID={params.id} page={curSelectedUserPage}/>
                        </>
                    )}
                </section>
            </div>
        </div>
    )
}

export default SelectedUser