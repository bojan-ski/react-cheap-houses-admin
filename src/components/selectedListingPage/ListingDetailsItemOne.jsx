import React from 'react'


const ListingDetailsItemOne = ({ selectedListingDetails }) => {
    const { propertyAddress, propertyLocation, propertyDistrict } = selectedListingDetails

    return (
        <>
            <p className='mb-0 fw-bold text-muted'>
                Adresa:<span className='ms-1 text-dark capitalize'>{propertyAddress}</span>
            </p>
            <p className='mb-0 fw-bold text-muted'>
                Mesto:<span className='ms-1 text-dark capitalize'>{propertyLocation}</span>
            </p>
            <p className='mb-0 fw-bold text-muted'>
                Okrug:<span className='ms-1 text-dark capitalize'>{propertyDistrict}</span>
            </p>
        </>
    )
}

export default ListingDetailsItemOne