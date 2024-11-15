import React, { useState } from 'react'
// context
import { useGlobalContext } from '../context'
// api
import checkIfImageIsValid from '../api/checkIfImageIsValid'
import getCurrentDate from '../utils/getCurrentDate'
// components
import FileInputImage from '../components/FileInputImage'
import FormTextArea from '../components/FormTextArea'
// toastify
import { toast } from 'react-toastify'
import updateAgencyProfileData from '../api/updateAgencyProfileData'


const SelectedAgencyModal = () => {
    const { selectedAgencyData, setSelectedAgencyData } = useGlobalContext()
    console.log(selectedAgencyData);

    const [agencyLogo, setAgencyLogo] = useState(selectedAgencyData?.data?.agencyLogo ? selectedAgencyData?.data?.agencyLogo : null);
    const [agencyDesc, setAgencyDesc] = useState(selectedAgencyData?.data?.agencyDescription ? selectedAgencyData?.data?.agencyDescription : '')

    const [isEditAgencyData, setIsEditAgencyData] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const handleAddAgencyLogo = e => {
        const { files } = e.target;

        if (files[0].size > import.meta.env.VITE_MAX_IMAGE_SIZE) {
            toast.error("Logo mora biti manja od 1MB.");
        } else {
            setAgencyLogo(files[0]);
        }
    };

    const handleAgencyLogo = () => {
        setAgencyLogo(null)
    };

    const handleUpdateSelectedAgencyProfileData = async e => {
        e.preventDefault()

        if(!agencyLogo || !agencyDesc) return setIsEditAgencyData(false)

        setIsLoading(true)

        const currentDate = getCurrentDate()

        // console.log(agencyLogo);
        // console.log(agencyDesc);

        const agencyLogoUrl = await checkIfImageIsValid('agenciesLogo', agencyLogo, selectedAgencyData.data.agencyName, currentDate);

        if(agencyLogoUrl == null) return setIsLoading(false)

        const response = await updateAgencyProfileData(selectedAgencyData.id, agencyLogoUrl, agencyDesc)

        if(response){
            // success message
            toast.success('Uspešno ste ažurirali podatke agencije')

            setIsEditAgencyData(false)
        }

        setIsLoading(false)
    }



    // console.log(agencyLogo);
    // console.log(agencyDesc);

    return (
        <div className="modal fade" id="selectedAgencyModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="selectedAgencyModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">

                    <div className="modal-header">
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>

                    <div className="modal-body">

                        <form onSubmit={handleUpdateSelectedAgencyProfileData}>
                            <div className="row">
                                {/* row item 1 */}
                                <div className="col-12 col-lg-6 text-start mb-3">
                                    <p className='fw-bold text-muted mb-2'>
                                        Logo agencije:
                                    </p>
                                    {agencyLogo ? (
                                        <img src={agencyLogo} alt="agency-logo" className='rounded-4' style={{ objectFit: 'cover', height: '100px', width: '100px' }} />
                                    ) : (
                                        <FileInputImage
                                            image={agencyLogo}
                                            onMutate={handleAddAgencyLogo}
                                            inputId="agencyLogo"
                                            handleRemoveImage={handleAgencyLogo}
                                            className="rounded-4"
                                            height='100px'
                                            width='100px'
                                        />
                                    )}
                                </div>

                                {/* row item 2 */}
                                <div className="col-12 col-lg-6 text-start mb-3">
                                    <p className='fw-bold text-muted mb-2'>
                                        Naziv agencije:
                                    </p>
                                    <h5 className='capitalize fw-bold mb-0'>
                                        {selectedAgencyData?.data?.agencyName}
                                    </h5>
                                </div>

                                {/* row item 3 */}
                                <div className="col-12 text-start">
                                    <p className='fw-bold text-muted mb-2'>
                                        Opis agencije:
                                    </p>
                                    <FormTextArea
                                        name="agencyDesc"
                                        rows={6}
                                        minLength={10}
                                        maxLength={300}
                                        defaultValue={agencyDesc}
                                        onMutate={e => setAgencyDesc(e.target.value)}
                                        disabled={!isEditAgencyData}
                                    />
                                </div>
                            </div>

                            <div className="edit-agency-data-btn-container d-flex justify-content-between">
                                {isEditAgencyData && (
                                    <>
                                        <button type="submit" className="btn btn-success fw-bold px-5 py-2" disabled={isLoading}>
                                            Sačuvaj
                                        </button>
                                        <button type="button" className='btn btn-warning fw-bold text-white px-5 py-2' onClick={() => setIsEditAgencyData(!isEditAgencyData)} disabled={isLoading}>
                                            Otkaži
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>

                        {!isEditAgencyData && (
                            <button type="button" className='btn bg-orange-hover fw-bold text-white px-5 py-2' onClick={() => setIsEditAgencyData(!isEditAgencyData)}>
                                Ažuriraj
                            </button>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SelectedAgencyModal