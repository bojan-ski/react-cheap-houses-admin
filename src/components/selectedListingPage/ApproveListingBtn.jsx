import React, { useEffect, useState } from 'react'
import { useLoaderData, useNavigate, useParams, useRevalidator } from 'react-router-dom'
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
import backPathUrl from '../../utils/backPathUrl'
// toastify
import { toast } from 'react-toastify'


const ApproveListingBtn = () => {
    const params = useParams()
    const navigate = useNavigate()
    const revalidator = useRevalidator()

    const selectedListingDetails = useLoaderData()
    const { userRef, userUsername, userAccountType } = selectedListingDetails

    const { selectedUserID, selectedAgencyData, fetchAllPendingListings, fetchAllActiveListings, fetchAllSelectedUserListings } = useGlobalContext()

    const [allAgencies, setAllAgencies] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const backPath = backPathUrl()

    const fetchAllAgenciesList = async () => {
        const response = await fetchAllAgencies()
        setAllAgencies(response);
    }

    useEffect(() => {
        fetchAllAgenciesList()
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
                const pageRefresh = window.location.pathname.split('/')[1]

                if (selectedUserID && pageRefresh == 'korisnici') await fetchAllSelectedUserListings(0, selectedUserID)

                if (selectedAgencyData?.data?.agencyID && pageRefresh == 'agencije') await fetchAllSelectedUserListings(0, selectedAgencyData?.data?.agencyID)

                await fetchAllActiveListings()
                await fetchAllPendingListings()

                //revalidate react loader
                revalidator.revalidate()

                // success message
                toast.success('Oglas je odobren')

                // redirect user
                setTimeout(() => navigate(`/${backPath}`), 2000)

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