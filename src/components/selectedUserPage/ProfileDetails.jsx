import React from 'react'
import { useLoaderData, useParams } from 'react-router-dom'


const ProfileDetails = () => {
    const params = useParams()
    const selectedUserAccountData = useLoaderData()
    const { username, email, accountType } = selectedUserAccountData

    return (
        <>
            <h2 className="fw-bold text-center mb-4">
                Podaci o nalogu
            </h2>

            <p className='mb-1 fw-bold text-muted'>
                ID korisnika:<span className='ms-2 text-dark'>{params.id}</span>
            </p>
            <p className='mb-1 fw-bold text-muted'>
                Korisničko ime:<span className='ms-2 text-dark'>{username}</span>
            </p>
            <p className='mb-1 fw-bold text-muted'>
                Elektronska pošta:<span className='ms-2 text-dark'>{email}</span>
            </p>
            <p className='mb-1 fw-bold text-muted'>
                Tip naloga:<span className='ms-2 text-dark capitalize'>{accountType}</span>
            </p>
        </>
    )
}

export default ProfileDetails