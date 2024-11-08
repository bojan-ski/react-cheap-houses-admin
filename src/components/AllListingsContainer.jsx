import React from 'react'


const AllListingsContainer = ({ listingsList }) => {
    return (
        <section className='listings-list'>
            <div className="row">
                {listingsList.map(listing => {
                    console.log(listing);
                })}
            </div>
        </section>
    )
}

export default AllListingsContainer