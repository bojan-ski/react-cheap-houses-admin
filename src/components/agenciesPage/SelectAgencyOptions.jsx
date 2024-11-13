import React from 'react'
import { useLoaderData } from 'react-router-dom'
// context
import { useGlobalContext } from '../../context'


const SelectAgencyOptions = () => {
    const allAgencies = useLoaderData()

    const { selectedAgencyData, setSelectedAgencyData, fetchAllSelectedUserListings } = useGlobalContext()

    const handleSelectedAgency = async (agency) => {
        setSelectedAgencyData(agency)
        await fetchAllSelectedUserListings(0, agency.data.agencyID)
    }    

    return (
        <div className='agency-box-data bg-white rounded-4 p-3'>
            {allAgencies.map(agency => {
                const { agencyID, agencyName } = agency.data;

                return <button
                    key={agencyName}
                    className={`btn layout-btn border-warning me-3 my-1 ${agencyID == selectedAgencyData?.data?.agencyID && 'layout-selected'}`}
                    onClick={() => handleSelectedAgency(agency)}
                >
                    {agencyName}
                </button>
            })}
        </div>
    )
}

export default SelectAgencyOptions