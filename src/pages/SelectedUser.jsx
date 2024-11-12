import React from 'react'
import { useLoaderData } from 'react-router-dom'
// api
import fetchSelectedDataFromFirebase from '../api/fetchSelectedDataFromFirebase'
// components
import BackButton from '../components/BackButton'


// LOADER
export const loader = async ({ params }) => {
    const selectedUserAccountData = await fetchSelectedDataFromFirebase('users', params.id, 'korisnika')

    return selectedUserAccountData
}

const SelectedUser = () => {
    const selectedUserAccountData = useLoaderData()
    console.log(selectedUserAccountData);

    const urlBackPath = `/${window.location.pathname.split('/')[1]}`

    return (
        <div className='selected-user-page'>
            <div className="container">

                <div className="my-5">
                    <BackButton backPath={urlBackPath} />
                </div>

                <section className='selected-user-account-details'>

                </section>
            </div>
        </div>
    )
}

export default SelectedUser