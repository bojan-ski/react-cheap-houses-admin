import React from 'react'
// context
import { useGlobalContext } from '../../context'
// components
import AllListingsContainer from '../AllListingsContainer'
import PaginationUsers from '../PaginationUsers'


const SelectedAgencyListings = () => {
    const { selectedAgencyData, allSelectedUserListings, fetchAllSelectedUserListings, curSelectedUserPage, isAllSelectedUserListingsLoading } = useGlobalContext()

    return (
        <>
            <h2 className="fw-bold text-center mb-4">
                Svi oglasi {selectedAgencyData?.data?.agencyName}
            </h2>

            <AllListingsContainer listingsList={allSelectedUserListings} />

            <PaginationUsers fetchData={fetchAllSelectedUserListings} userID={selectedAgencyData?.data?.agencyID} page={curSelectedUserPage} isLoading={isAllSelectedUserListingsLoading} />
        </>
    )
}

export default SelectedAgencyListings