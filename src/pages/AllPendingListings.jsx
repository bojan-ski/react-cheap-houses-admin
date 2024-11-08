import React, { useEffect } from 'react'
// context
import { useGlobalContext } from '../context'
// components
import PageHeader from '../components/PageHeader'
import NoDataAvailableMessage from '../components/NoDataAvailableMessage'
import AllListingsContainer from '../components/AllListingsContainer'


const AllPendingListings = () => {
    const { allPendingListings, fetchAllPendingListings, curPendingListingsPage } = useGlobalContext()

    // Fetch the first page on mount
    useEffect(() => {
        console.log('All Pending Listings page - useEffect');

        if (allPendingListings.length == 0) {
            console.log('get Pending data');

            fetchAllPendingListings();
        }
    }, [])

    // console.log(allPendingListings);

    return (
        <div className="pending-listings-page mt-5">

            <PageHeader title='Oglasi na čekanju' />

            <div className="container">
                {!allPendingListings || allPendingListings == 0 ? (
                    <NoDataAvailableMessage text='novih oglasa koje čekaju validaciju' />
                ) : (
                    <>
                        <AllListingsContainer listingsList={allPendingListings} />

                        {/* <Pagination fetchData={fetchBlogPosts} page={curBlogPage} queryParam={searchTerm} /> */}
                    </>
                )}
            </div>
        </div>
    )
}

export default AllPendingListings