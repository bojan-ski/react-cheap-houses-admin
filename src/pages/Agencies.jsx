import React from 'react'
import { useLoaderData } from 'react-router-dom';
// api
import fetchAllAgencies from '../api/fetchAllAgencies';
// components
import PageHeader from '../components/PageHeader';
import NoDataAvailableMessage from '../components/NoDataAvailableMessage';
import AgenciesContainer from '../components/agenciesPage/AgenciesContainer';
import { auth } from '../firebase.config';


// LOADER
export const loader = async () => {   
    if(!auth?.currentUser) return []

    const allAgencies = await fetchAllAgencies()

    return allAgencies
}

const Agencies = () => {
    const allAgencies = useLoaderData()

    return (
        <div className='agencies-page mt-5'>

            <PageHeader title='Agencije' />

            <div className="container">
                {!allAgencies || allAgencies == 0 ? (
                    <NoDataAvailableMessage text='verifikovanih Agencija' />
                ) : (
                    <AgenciesContainer />
                )}
            </div>
        </div>
    )
}

export default Agencies