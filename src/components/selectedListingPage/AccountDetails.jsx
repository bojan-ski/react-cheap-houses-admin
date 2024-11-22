import React from 'react'
import { useLoaderData } from 'react-router-dom'
// components
import ApproveListingBtn from './ApproveListingBtn'
import DeleteListingBtn from './DeleteListingBtn'


const AccountDetails = () => {
    const selectedListingDetails = useLoaderData()
    const { userRef, userUsername, userEmail, userAccountType, listingStatus } = selectedListingDetails    
    
    return (
        <div className="row">
            <div className="col-12 col-lg-6 mb-3">
                <h4 className="fw-bold">
                    Podaci o nalogu:
                </h4>

                <p className='mb-0 fw-bold text-muted'>
                    ID korisnika:<span className='ms-2 text-dark'>{userRef}</span>
                </p>
                <p className='mb-0 fw-bold text-muted'>
                    Korisničko ime:<span className='ms-2 text-dark'>{userUsername}</span>
                </p>
                <p className='mb-0 fw-bold text-muted'>
                    Elektronska pošta:<span className='ms-2 text-dark'>{userEmail}</span>
                </p>
                <p className='mb-0 fw-bold text-muted'>
                    Tip naloga:<span className='ms-2 text-dark capitalize'>{userAccountType}</span>
                </p>
            </div>

            <div className="col-12 col-lg-6 text-start text-lg-end mb-3">
                {listingStatus != 'active' && <ApproveListingBtn />}

                <DeleteListingBtn />
            </div>
        </div>
    )
}

export default AccountDetails