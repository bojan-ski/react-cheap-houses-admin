import React, { useEffect } from 'react'
import { useLoaderData } from 'react-router-dom';
// context
import { useGlobalContext } from '../../context';
// components
import SelectAgencyOptions from './SelectAgencyOptions';
import SelectedAgencyProfileData from './SelectedAgencyProfileData';
import NoDataAvailableMessage from '../NoDataAvailableMessage';
import SelectedAgencyListings from './SelectedAgencyListings';


const AgenciesContainer = () => {
    const allAgencies = useLoaderData()
    const { allSelectedUserListings, selectedAgencyData, setSelectedAgencyData, fetchAllSelectedUserListings } = useGlobalContext()   
    
    // Fetch first agency data on mount
    useEffect(() => {
        console.log('AgenciesContainer - useEffect');

        if (allAgencies.length > 0 && selectedAgencyData.id == undefined) {
            setSelectedAgencyData(allAgencies[0])
            fetchAllSelectedUserListings(0, allAgencies[0].data.agencyID);
        }
    }, [])   

    return (
        <div className='row'>
            {/* row item 1 */}
            <section className="col-12 col-md-6 mb-3">
                <SelectAgencyOptions />
            </section>

            {/* row item 2 */}
            <section className="col-12 col-md-6 mb-3">
                <SelectedAgencyProfileData />
            </section>

            {/* row item 3 */}
            <section className="col-12 mt-4 mb-5">
                {!allSelectedUserListings || allSelectedUserListings == 0 ? (
                    <NoDataAvailableMessage text='oglasa' />
                ) : (
                    <SelectedAgencyListings />
                )}
            </section>
        </div>
    )
}

export default AgenciesContainer