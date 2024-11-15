import React from 'react'
// modals
import SelectedAgencyModal from '../../modals/SelectedAgencyModal';
// react icons
import { FaEdit } from "react-icons/fa";


const EditSelectedAgencyBtn = () => {
    return (
        <>
            <button className='btn text-white btn-warning me-3' data-bs-toggle="modal" data-bs-target="#selectedAgencyModal" >
                <FaEdit />
            </button>

            <SelectedAgencyModal />
        </>
    )
}

export default EditSelectedAgencyBtn