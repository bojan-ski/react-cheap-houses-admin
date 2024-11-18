import React, { useState } from 'react'
import { useLoaderData, useRevalidator } from 'react-router-dom';
// context
import { useGlobalContext } from '../../context';
// api
import deleteAgencyProfileData from '../../api/deleteAgencyProfileData';
// toastify
import { toast } from 'react-toastify';
// react icons
import { MdDeleteForever } from 'react-icons/md';


const DeleteSelectedAgencyBtn = () => {
    const allAgencies = useLoaderData()

    const revalidator = useRevalidator()

    const { selectedAgencyData, setSelectedAgencyData, fetchAllSelectedUserListings } = useGlobalContext()

    const [isLoading, setIsLoading] = useState(false)

    const handleDeleteSelectedAgencyProfileData = async () => {      
        if (window.confirm('Obriši podatke agencije?')) {
            setIsLoading(true)

            const response = await deleteAgencyProfileData(selectedAgencyData.id, selectedAgencyData.data.agencyLogo)

            if (response) {
                // success message 
                toast.success('Uspešno ste obrisali podatke agencije');

                //revalidate react loader
                revalidator.revalidate()

                // update state
                setTimeout(() => {
                    const updateState = allAgencies.filter(agency => agency.id != selectedAgencyData.id)
                    setSelectedAgencyData(updateState[0])
                    fetchAllSelectedUserListings(0, updateState[0].data.agencyID);
                }, 500)
            }

            setIsLoading(false)
        }
    }

    return (
        <button className='btn btn-danger' onClick={handleDeleteSelectedAgencyProfileData} disabled={isLoading}>
            <MdDeleteForever />
        </button>
    )
}

export default DeleteSelectedAgencyBtn