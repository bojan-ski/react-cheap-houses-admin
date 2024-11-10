import React from 'react'
import { useLoaderData } from 'react-router-dom';
// api
import fetchAllAgencies from '../api/fetchAllAgencies';


// LOADER
export const loader = async () => {
    const allAgencies = await fetchAllAgencies()

    return allAgencies
}

const Agencies = () => {
    const allAgencies = useLoaderData()
    console.log(allAgencies);

    return (
        <div className='agencies-page'>
            Agencies
        </div>
    )
}

export default Agencies