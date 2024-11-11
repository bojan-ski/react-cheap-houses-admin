import React, { useEffect } from 'react'
// context
import { useGlobalContext } from '../context'
// components
import PageHeader from '../components/PageHeader'
import NoDataAvailableMessage from '../components/NoDataAvailableMessage'
import SelectQueryOption from '../components/allActiveListingsPage/SelectQueryOption'
import AllListingsContainer from '../components/AllListingsContainer'
import Pagination from '../components/Pagination'


const AllActiveListings = () => {
    const { allActiveListings, fetchAllActiveListings, curActiveListingsPage, userQueryParameter } = useGlobalContext()

    // Fetch the first page on mount
    useEffect(() => {
        console.log('All Active Listings page - useEffect');

        if (allActiveListings.length == 0) {
            fetchAllActiveListings();
        }
    }, [])

    return (
        <div className="active-listings-page my-5">

            <PageHeader title='Aktivni oglasi' />

            <div className="container">

                <SelectQueryOption />

                {!allActiveListings || allActiveListings == 0 ? (
                    <NoDataAvailableMessage text='objavljenih oglasa' />
                ) : (
                    <>
                        <AllListingsContainer listingsList={allActiveListings} />

                        <Pagination fetchData={fetchAllActiveListings} page={curActiveListingsPage} queryParam={userQueryParameter} />
                    </>
                )}
            </div>
        </div>
    )
}

export default AllActiveListings