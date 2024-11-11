import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
// api
import addAgency from '../../api/addAgency'
import approveListing from '../../api/approveListing'
import fetchAllAgencies from '../../api/fetchAllAgencies'
// context
import { useGlobalContext } from '../../context'
// firebase
import { serverTimestamp } from 'firebase/firestore'
// utils
import scrollToTop from '../../utils/scrollToTop'
// toastify
import { toast } from 'react-toastify'


const ApproveListingBtn = () => {
    const params = useParams()
    const navigate = useNavigate()
    const selectedListingDetails = useLoaderData()
    const { userRef, userUsername, userAccountType } = selectedListingDetails

    const { fetchAllPendingListings, fetchAllActiveListings } = useGlobalContext()

    const [allAgencies, setAllAgencies] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const fetchAllAgenciesList = async () => {
        const response = await fetchAllAgencies()
        setAllAgencies(response);
    }

    useEffect(() => {
        console.log('useEffect - ApproveListingBtn');

        fetchAllAgenciesList()
        // if (selectedListingDetails.listingStatus == 'pending') fetchAllAgenciesList()
    }, [])

    const checkIfAgencyInDB = async () => {
        const agencyExists = allAgencies.some(agency => agency.data.agencyID === userRef);

        let apiCallResponse

        if (!agencyExists) {
            const agencyData = {
                agencyID: userRef,
                agencyName: userUsername,
                timestamp: serverTimestamp()
            }

            apiCallResponse = await addAgency(agencyData)
        } else {
            apiCallResponse = true
        }

        return apiCallResponse
    }

    const handleApproveListing = async () => {
        setIsLoading(true)

        if (window.confirm('Odobri oglas?')) {
            if (userAccountType == 'pravno') {
                const checkAgency = await checkIfAgencyInDB()

                if (!checkAgency) {
                    toast.error('Greška prilikom odobravanja oglasa');

                    return setIsLoading(false)
                }
            }

            const response = await approveListing(params.id)

            if (response) {
                // re-fetch listings
                await fetchAllPendingListings()
                await fetchAllActiveListings()

                // success message
                toast.success('Oglas je odobren')

                // redirect user
                setTimeout(() => navigate('/aktivni_oglasi'), 2500)
                // setTimeout(()=> window.location.href ='/aktivni_oglasi',2000)

                //scroll to top
                scrollToTop()
            }
        }

        setIsLoading(false)
    }

    return (
        <button className="btn btn-success me-3" onClick={handleApproveListing} disabled={isLoading}>
            Odobri oglas
        </button>
    )
}

export default ApproveListingBtn