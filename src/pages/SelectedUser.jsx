import React from 'react'
// components
import BackButton from '../components/BackButton'


const SelectedUser = () => {
    const urlBackPath = `/${window.location.pathname.split('/')[1]}`

    return (
        <div className='selected-user-page'>
            <div className="container">

                <div className="my-5">
                    <BackButton backPath={urlBackPath} />
                </div>

                <h1>
                    SelectedUser
                </h1>
            </div>
        </div>
    )
}

export default SelectedUser