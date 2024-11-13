import React from 'react'
// context 
import { useGlobalContext } from '../../context';
// react icons
import { MdDeleteForever } from 'react-icons/md';
import { FaEdit } from "react-icons/fa";


const SelectedAgencyProfileData = () => {
    const { selectedAgencyData } = useGlobalContext()    

    return (
        <div className='agency-box-data bg-white rounded-4 p-3'>

            <div className="row">

                {/* sub row item 1 */}
                <div className="col-12 text-center text-lg-end mb-4 border-bottom pb-3">
                    <button className='btn text-white btn-warning me-3'>
                        <FaEdit />
                    </button>
                    <button className='btn btn-danger'>
                        <MdDeleteForever />
                    </button>
                </div>

                {/* sub row item 2 */}
                <div className="col-12 col-lg-4">
                    <div className="row">
                        <div className="col-6 col-lg-12 mb-2">
                            {selectedAgencyData?.data?.agencyLogo && (
                                <img src={selectedAgencyData?.data?.agencyLogo} alt="agency-logo" className='rounded-4' style={{ objectFit: 'cover', height: '100px', width: '100px' }} />
                            )}
                        </div>

                        <div className="col-6 col-lg-12">
                            <h5 className='capitalize fw-bold mb-0'>
                                {selectedAgencyData?.data?.agencyName}
                            </h5>
                        </div>
                    </div>
                </div>

                {/* sub row item 3 */}
                <div className="col-12 col-lg-8">
                    {selectedAgencyData.agencyDescription && (
                        <p className='agency-desc mb-0'>
                            {selectedAgencyData?.data?.agencyDescription}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SelectedAgencyProfileData