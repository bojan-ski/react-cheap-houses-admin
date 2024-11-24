import React, { useEffect, useState } from 'react'
import { useRevalidator } from 'react-router-dom'
// context
import { useGlobalContext } from '../context'
// api
import checkIfImageIsValid from '../api/checkIfImageIsValid'
import updateAgencyProfileData from '../api/updateAgencyProfileData'
import deleteUploadedImage from '../api/deleteUploadedImage'
// utils
import getCurrentDate from '../utils/getCurrentDate'
// components
import FileInputImage from '../components/FileInputImage'
import FormTextArea from '../components/FormTextArea'
// toastify
import { toast } from 'react-toastify'
// react icons
import { RiDeleteBin2Fill } from 'react-icons/ri'


const SelectedAgencyModal = () => {
    const revalidator = useRevalidator()

    const { selectedAgencyData, setSelectedAgencyData } = useGlobalContext()  

    const [agencyLogo, setAgencyLogo] = useState('');
    const [agencyDesc, setAgencyDesc] = useState('')

    const [isLoading, setIsLoading] = useState(false)

    useEffect(()=>{
        setAgencyDesc(selectedAgencyData?.data?.agencyDescription || '')
    },[selectedAgencyData.id])

    const handleAddAgencyLogo = e => {
        const { files } = e.target;

        if (files[0].size > import.meta.env.VITE_MAX_IMAGE_SIZE) {
            toast.warning("Logo mora biti manja od 1MB.");
        } else {
            setAgencyLogo(files[0]);
        }
    };

    const handleRemoveAgencyLogo = () => {
        setAgencyLogo('')
    };   

    const handleUpdateSelectedAgencyProfileData = async e => {
        e.preventDefault()

        setIsLoading(true)

        const currentDate = getCurrentDate()

        const agencyLogoUrl = await checkIfImageIsValid('agenciesLogo', agencyLogo, selectedAgencyData.data.agencyName, currentDate);

        const response = await updateAgencyProfileData(selectedAgencyData.id, agencyLogoUrl, agencyDesc)

        if (response) {
            // success message
            toast.success('Uspešno ste ažurirali podatke agencije')

            // update global state
            setSelectedAgencyData((curState) => ({
                ...curState,
                data: {
                    ...curState.data,
                    ...(agencyLogoUrl != null && { agencyLogo: agencyLogoUrl }),
                    ...(agencyDesc != '' && { agencyDescription: agencyDesc })
                },
            }));

            // reset local state
            setAgencyLogo('')

            //revalidate react loader
            revalidator.revalidate()
        }

        setIsLoading(false)
    }

    const handleDeleteAgencyLogo = async (agencyLogoUrl) => {
        if (window.confirm('Obriši logo agencije?')) {
            await deleteUploadedImage(agencyLogoUrl);

            const response = await updateAgencyProfileData(selectedAgencyData.id, '', '')

            if (response) {
                // success message
                toast.success('Logo agencije je obrisan')

                // update global state
                setSelectedAgencyData((curState) => ({
                    ...curState,
                    data: {
                        ...curState.data,
                        agencyLogo: '',
                    },
                }));

                //revalidate react loader
                revalidator.revalidate()
            }
        }
    }

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
                                <div className="col-6 text-start mb-3">
                                    <p className='fw-bold text-muted mb-2'>
                                        Logo agencije:
                                    </p>
                                    {selectedAgencyData?.data?.agencyLogo ? (
                                        <>
                                            <button
                                                type="button"
                                                className="btn btn-danger text-white d-block mb-2 ms-4"
                                                onClick={() => handleDeleteAgencyLogo(selectedAgencyData?.data?.agencyLogo)}
                                            >
                                                <RiDeleteBin2Fill size={25} />
                                            </button>
                                            <img src={selectedAgencyData?.data?.agencyLogo} alt="agency-logo" className='rounded-4' style={{ objectFit: 'cover', height: '100px', width: '100px' }} />
                                        </>
                                    ) : (
                                        <FileInputImage
                                            image={agencyLogo}
                                            onMutate={handleAddAgencyLogo}
                                            inputId="agencyLogo"
                                            handleRemoveImage={handleRemoveAgencyLogo}
                                            className="rounded-4 ms-2"
                                            height='100px'
                                            width='100px'
                                        />
                                    )}
                                </div>

                                {/* row item 2 */}
                                <div className="col-6 text-start mb-3">
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
                                        rows={4}
                                        minLength={10}
                                        maxLength={220}
                                        // value={selectedAgencyData?.data?.agencyDescription || ''}
                                        // defaultValue={selectedAgencyData?.data?.agencyDescription || ''}
                                        value={agencyDesc}
                                        onMutate={e => setAgencyDesc(e.target.value)}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>
                            <button type="submit" className="btn bg-orange-hover text-white w-100 fw-bold fs-5 px-5 py-2" disabled={isLoading}>
                                Sačuvaj
                            </button>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default SelectedAgencyModal