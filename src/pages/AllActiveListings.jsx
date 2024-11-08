import React, { useEffect } from 'react'
// context
import { useGlobalContext } from '../context'
// components
import PageHeader from '../components/PageHeader'
import NoDataAvailableMessage from '../components/NoDataAvailableMessage'
import AllListingsContainer from '../components/AllListingsContainer'


const AllActiveListings = () => {
    const { allActiveListings, fetchAllActiveListings, curActiveListingsPage } = useGlobalContext()

    // Fetch the first page on mount
    useEffect(() => {
        console.log('All Active Listings page - useEffect');

        if (allActiveListings.length == 0) {
            console.log('get Active data');

            fetchAllActiveListings();
        }
    }, [])

    // console.log(allActiveListings);
    return (
        <div className="active-listings-page mt-5">

            <PageHeader title='Aktivni oglasi' />

            <div className="container">
                {!allActiveListings || allActiveListings == 0 ? (
                    <NoDataAvailableMessage text='objavljenih oglasa' />
                ) : (
                    <>
                        <AllListingsContainer listingsList={allActiveListings} />

                        {/* <Pagination fetchData={fetchBlogPosts} page={curBlogPage} queryParam={searchTerm} /> */}
                    </>
                )}
            </div>
        </div>
    )
}

export default AllActiveListings