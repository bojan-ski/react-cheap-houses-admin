import React from 'react'


const ListingDetailsItemThree = ({ selectedListingDetails }) => {
    const { listingDescription } = selectedListingDetails

    return (
        <>
            <h5 className="mb-3">
                Opis:
            </h5>
            <p className='mb-0 fw-bold text-break'>
                {listingDescription}
            </p>
        </>
    )
}

export default ListingDetailsItemThree