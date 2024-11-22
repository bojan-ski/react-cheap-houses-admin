import React, { useState } from 'react'
import { useLoaderData, useNavigate, useParams } from 'react-router-dom'
// context
import { useGlobalContext } from '../../context'
// api
import deleteListing from '../../api/deleteListing'
// utils
import scrollToTop from '../../utils/scrollToTop'
import backPathUrl from '../../utils/backPathUrl'
// toastify
import { toast } from 'react-toastify'


const DeleteListingBtn = () => {
    const params = useParams()
    const navigate = useNavigate()
    const selectedListingDetails = useLoaderData()

    const { selectedUserID, selectedAgencyData, fetchAllPendingListings, fetchAllActiveListings, fetchAllSelectedUserListings } = useGlobalContext()

    const [isLoading, setIsLoading] = useState(false)

    const backPath = backPathUrl()    

    const handleDeleteListing = async () => {
        if (window.confirm('Obriši oglas?')) {
            setIsLoading(true)

            const response = await deleteListing(params.id, selectedListingDetails.imageUrls)

            if (response) {
                // re-fetch listings
                const pageRefresh = window.location.pathname.split('/')[1]

                if (selectedUserID && pageRefresh == 'korisnici') await fetchAllSelectedUserListings(0, selectedUserID)

                if (selectedAgencyData?.data?.agencyID && pageRefresh == 'agencije') await fetchAllSelectedUserListings(0, selectedAgencyData?.data?.agencyID)

                if (pageRefresh == 'oglasi_na_cekanju') await fetchAllPendingListings()

                if (pageRefresh == 'aktivni_oglasi') await fetchAllActiveListings()

                // success message after listing removal 
                toast.success('Uspešno ste obrisali oglas');

                // redirect user
                setTimeout(() => navigate(`/${backPath}`), 2000)

                //scroll to top
                scrollToTop()
            }

            setIsLoading(false)
        }
    }

    return (
        <button type="button" className="btn btn-danger" onClick={handleDeleteListing} disabled={isLoading}>
            Obriši oglas
        </button>
    )
}

export default DeleteListingBtn