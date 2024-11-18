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

    const { fetchAllPendingListings, fetchAllActiveListings } = useGlobalContext()
    
    const [isLoading, setIsLoading] = useState(false)

    const backPath = backPathUrl()

    const handleDeleteListing = async () => {
        if (window.confirm('Obriši oglas?')) {
            setIsLoading(true)

            const response = await deleteListing(params.id, selectedListingDetails.imageUrls)

            if (response) {
                // re-fetch listings
                if (selectedListingDetails.listingStatus == 'pending') {
                    console.log('pending');                    
                    await fetchAllPendingListings()
                } else {
                    console.log('active');
                    await fetchAllActiveListings()
                }

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