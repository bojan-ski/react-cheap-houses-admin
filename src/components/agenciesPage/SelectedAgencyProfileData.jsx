import React from 'react'
// context 
import { useGlobalContext } from '../../context';
// components
import DeleteSelectedAgencyBtn from './DeleteSelectedAgencyBtn';
import EditSelectedAgencyBtn from './EditSelectedAgencyBtn';


const SelectedAgencyProfileData = () => {
    const { selectedAgencyData } = useGlobalContext()
    // console.log(selectedAgencyData);

    return (
        <div className='agency-box-data bg-white rounded-4 p-3'>

            <div className="row">

                {/* sub row item 1 */}
                <div className="col-12 text-center text-lg-end mb-4 border-bottom pb-3">
                    <EditSelectedAgencyBtn />

                    <DeleteSelectedAgencyBtn selectedAgencyData={selectedAgencyData} />
                </div>

                {/* sub row item 2 */}
                <div className="col-12 col-lg-4">
                    <div className="row">
                        <div className="col-6 col-lg-12 mb-2 d-flex align-items-center justify-content-center">
                            {selectedAgencyData?.data?.agencyLogo && (
                                <img src={selectedAgencyData?.data?.agencyLogo} alt="agency-logo" className='rounded-4' style={{ objectFit: 'cover', height: '100px', width: '100px' }} />
                            )}
                        </div>

                        <div className="col-6 col-lg-12 d-flex align-items-center justify-content-center">
                            <h5 className='capitalize fw-bold mb-0'>
                                {selectedAgencyData?.data?.agencyName}
                            </h5>
                        </div>
                    </div>
                </div>

                {/* sub row item 3 */}
                <div className="col-12 col-lg-8">
                    {selectedAgencyData?.data?.agencyDescription && (
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