import React from 'react'


const ListingDetailsItemFour = ({ selectedListingDetails }) => {
    const { contactFullName, contactPhoneNumber, contactEmailAddress } = selectedListingDetails

    return (
        <>
            <h4 className="mb-3">
                Kontakt informacije:
            </h4>
            <p className='mb-0 fw-bold text-muted'>
                Ime vlasnika:<span className='ms-1 text-dark'>{contactFullName}</span>
            </p>
            <p className='mb-0 fw-bold text-muted'>
                Email:<span className='ms-1 text-dark'>{contactEmailAddress}</span>
            </p>
            <p className='mb-0 fw-bold text-muted'>
                Telefon:<span className='ms-1 text-dark'>+381 {contactPhoneNumber}</span>
            </p>
        </>
    )
}

export default ListingDetailsItemFour