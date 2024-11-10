import React from 'react'


const AccountDetails = ({ selectedListingDetails }) => {
    const { userRef, userUsername, userEmail, userAccountType } = selectedListingDetails

    return (
        <div className="row">
            <div className="col-12 col-lg-6 mb-3">
                <h4 className="fw-bold">
                    Podaci o nalogu:
                </h4>

                <p className='mb-0 fw-bold text-muted'>
                    ID korisnika:<span className='ms-2 text-dark capitalize'>{userRef}</span>
                </p>
                <p className='mb-0 fw-bold text-muted'>
                    Korisničko ime:<span className='ms-2 text-dark capitalize'>{userUsername}</span>
                </p>
                <p className='mb-0 fw-bold text-muted'>
                    Elektronska pošta:<span className='ms-2 text-dark capitalize'>{userEmail}</span>
                </p>
                <p className='mb-0 fw-bold text-muted'>
                    Tip naloga:<span className='ms-2 text-dark capitalize'>{userAccountType}</span>
                </p>

            </div>

            <div className="col-12 col-lg-6 text-start text-lg-end mb-3">
                <button className="btn btn-success me-3">
                    Odobri oglas
                </button>

                <button className="btn btn-danger">
                    Obriši oglas
                </button>
            </div>
        </div>
    )
}

export default AccountDetails