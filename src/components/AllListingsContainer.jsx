import React from 'react'
// components
import AllListingsContainerCard from './AllListingsContainerCard'


const AllListingsContainer = ({ listingsList }) => {
    return (
        <section className='listings-list mb-3'>
            <div className="row">
                {listingsList.map(listing => <AllListingsContainerCard key={listing.id} listing={listing} />)}
            </div>
        </section>
    )
}

export default AllListingsContainer