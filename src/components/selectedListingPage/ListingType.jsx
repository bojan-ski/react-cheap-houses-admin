import React from 'react'
// utils
import priceComma from '../../utils/priceComma'


const ListingType = ({ selectedListingDetails }) => {
    const { listingType, propertyType, propertyName, askingPrice } = selectedListingDetails

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-3">
                <h2 className="fw-bold capitalize">
                    {propertyType}
                </h2>
                <h2 className="text-orange fw-bold">
                    {listingType === 'izdajem' ? "IZDAJE SE" : 'NA PRODAJU'}
                </h2>
            </div>

            <h3 className="fw-bold capitalize mb-3">
                {propertyName}
            </h3>
            <h4 className="text-orange fw-bold">
                {priceComma(askingPrice)} EUR {listingType === 'izdajem' ? 'mesečno' : ''}
            </h4>
        </>
    )
}

export default ListingType