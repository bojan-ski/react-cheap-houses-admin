import React from 'react'
// react icons
import { MdDeleteForever } from 'react-icons/md';


const DeleteSelectedAgencyBtn = ({ selectedAgencyData }) => {
    // console.log(selectedAgencyData);
    
    const handleDeleteSelectedAgencyProfileData = () => {
        console.log('handleDeleteSelectedAgencyProfileData');

    }

    return (
        <button className='btn btn-danger' onClick={handleDeleteSelectedAgencyProfileData}>
            <MdDeleteForever />
        </button>
    )
}

export default DeleteSelectedAgencyBtn