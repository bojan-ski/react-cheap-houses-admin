import { useState, useCallback } from "react";
// firebase func
import { collection, query, orderBy, startAfter, limit, getDocs, where } from "firebase/firestore";
import { db } from "../firebase.config";
// toastify
import { toast } from "react-toastify";


const useFetchAllListingsData = (itemsPerPage, listingsStatus) => {
    const [listings, setListings] = useState([]);
    const [pageSnapshots, setPageSnapshots] = useState([]);
    const [page, setPage] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchListings = useCallback(async (pageNumber = 0, userQueryParameter = '', reset = false) => {  
        setIsLoading(true);   
        
        let updatedSnapshots = pageSnapshots;
              
        try {
            let queryParameters = [
                collection(db, 'listings'),
                orderBy('timestamp', 'desc'),
                limit(itemsPerPage),
                where('listingStatus', '==', `${listingsStatus}`)
            ]

            if (typeof userQueryParameter == 'string' && userQueryParameter.length > 0) {
                queryParameters.push(where('propertyLocation', '==', userQueryParameter));
            }

            const { selectedListingType, selectedPropertyType, selectedDistrict } = userQueryParameter

            if (selectedListingType && selectedListingType !== "Svi oglasi") {
                queryParameters.push(where('listingType', '==', selectedListingType));
            }
            if (selectedPropertyType && selectedPropertyType !== "Svi tipovi imovine") {
                queryParameters.push(where('propertyType', '==', selectedPropertyType));
            }
            if (selectedDistrict && selectedDistrict !== "Svi okruzi") {
                queryParameters.push(where('propertyDistrict', '==', selectedDistrict));
            }

            let q;

            if (reset || pageNumber === 0) {
                // Fetch the first page or reset to the first page
                q = query(
                    ...queryParameters,
                );

                updatedSnapshots = [];
                setPageSnapshots(updatedSnapshots);
            } else if (pageNumber > page) {
                // Moving forward, use the last snapshot of the current page              
                let lastVisible = updatedSnapshots[updatedSnapshots.length - 1];

                q = query(...queryParameters, startAfter(lastVisible));
            } else if (pageNumber < page) {
                // Moving back, use the snapshot of the previous page
                let previousPageSnapshot = updatedSnapshots[pageNumber - 1];

                q = query(...queryParameters, startAfter(previousPageSnapshot));
            }

            const querySnapshot = await getDocs(q);

            // Check if the end of the collection is reached
            if (querySnapshot.docs.length == 0 && pageNumber !== 0) {
                // Loop back to the first page
                updatedSnapshots = [];
                setPageSnapshots(updatedSnapshots);

                fetchListings(0, userQueryParameter, true);
                return;
            }

            // Update the last visible document for the next page
            const newLastVisible = querySnapshot.docs[querySnapshot.docs.length - 1];
            updatedSnapshots = reset
                ? [newLastVisible]
                : [...updatedSnapshots, newLastVisible];
            setPageSnapshots(updatedSnapshots);

            // Replace the listings with the new set of documents for the current page
            setListings(querySnapshot.docs.map(doc => ({ id: doc.id, data: doc.data() })));
            setPage(pageNumber);
        } catch (error) {
            //error message
            toast.error('Greška prilikom prikazivanja svi objavljenih oglasa')          
        }

        setIsLoading(false)
        
    }, [page, itemsPerPage, pageSnapshots])

    return { listings, fetchListings, page, isLoading };
}

export default useFetchAllListingsData