import React, { useEffect } from 'react'
// context
import { useGlobalContext } from '../context'
// components
import PageHeader from '../components/PageHeader'
import NoDataAvailableMessage from '../components/NoDataAvailableMessage'
import AllListingsContainer from '../components/AllListingsContainer'
import Pagination from '../components/Pagination'


const AllPendingListings = () => {
    const { allPendingListings, fetchAllPendingListings, curPendingListingsPage, isPendingListingsLoading } = useGlobalContext()

    // Fetch the first page on mount
    useEffect(() => {
        if (allPendingListings.length == 0) fetchAllPendingListings();
    }, [])

    return (
        <div className="pending-listings-page my-5">

            <PageHeader title='Oglasi na čekanju' />

            <div className="container">
                {!allPendingListings || allPendingListings == 0 ? (
                    <NoDataAvailableMessage text='novih oglasa koje čekaju odobrenje' />
                ) : (
                    <>
                        <AllListingsContainer listingsList={allPendingListings} />

                        <Pagination fetchData={fetchAllPendingListings} page={curPendingListingsPage} isLoading={isPendingListingsLoading} />
                    </>
                )}
            </div>
        </div>
    )
}

export default AllPendingListings