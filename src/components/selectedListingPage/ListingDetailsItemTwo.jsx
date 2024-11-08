import React from 'react'
// React Icons
import { LiaTapeSolid } from 'react-icons/lia'
import { MdConfirmationNumber, MdOutlineBedroomChild } from 'react-icons/md'
import { PiBathtubLight } from 'react-icons/pi'
import { CiCalendarDate } from "react-icons/ci";


const ListingDetailsItemTwo = ({ selectedListingDetails }) => {
    const { propertyType, numRooms, numBathrooms, lotNumber, squareFootage, listingCreated } = selectedListingDetails

    return (
        <>
            {propertyType === 'plac' ? (
                <>
                    <p className="mb-0 fw-bold text-muted d-flex align-items-center" >
                        <MdConfirmationNumber className='me-2' />
                        Broj parcele:<span className="ms-1 fw-bold text-dark">
                            {lotNumber}
                        </span>
                    </p>
                </>
            ) : (
                <>
                    <p className="mb-0 fw-bold text-muted d-flex align-items-center" >
                        <MdOutlineBedroomChild className='me-2' />
                        Sobe:<span className="ms-1 fw-bold text-dark">{numRooms}</span>
                    </p>
                    <p className="mb-0 fw-bold text-muted d-flex align-items-center">
                        <PiBathtubLight className='me-2' />
                        Kupatila:<span className="ms-1 fw-bold text-dark">{numBathrooms}</span>
                    </p>
                </>
            )}
            <p className="mb-0 fw-bold text-muted d-flex align-items-center">
                <LiaTapeSolid className='me-2' />
                Prostor:
                <span className="ms-1 fw-bold text-dark"> {squareFootage}</span>
                <span className="ms-1 fw-bold text-dark">{propertyType == 'plac' ? 'ari' : 'kvadrata'}</span>
            </p>
            <p className="mb-0 fw-bold text-muted d-flex align-items-center">
                <CiCalendarDate className='me-2' />
                Oglas objavljen:<span className="ms-1 fw-bold text-dark"> {listingCreated}</span>
            </p>
        </>
    )
}

export default ListingDetailsItemTwo